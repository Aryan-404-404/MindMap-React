import React, { useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MindMapNode from './components/MindMapNode';
import { getLayoutedElements } from './utils/layout';
import { initialNodes, initialEdges } from './data/initialData';
import { getDescendants } from './utils/graphUtils';
import { onExport } from './utils/export'
import NavBar from './components/NavBar';

// custom node
const nodeTypes = { mindmap: MindMapNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    // We run our data through the "Layout Engine" to get coordinates
    const layout = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, []);

  const onLabelChange = (e) => {
    const newLabel = e.target.value;
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, label: newLabel }
    }))

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, label: newLabel }
          }
        }
        return node
      })
    )
  }
  const onSummaryChange = (e) => {
    const newSummary = e.target.value;
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, summary: newSummary }
    }))

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, summary: newSummary }
          }
        }
        return node
      })
    )
  }

  // Expand/Collapse Logic
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    const descendants = getDescendants(nodes, edges, node.id);    // Find all children/grandchildren of this node
    if (descendants.length === 0) return;

    // Check if we are Opening or Closing
    const isExpanding = descendants[0].hidden;

    // Update the nodes list (Flip the 'hidden' switch)
    const newNodes = nodes.map((n) => {
      const isDescendant = descendants.some((d) => d.id === n.id);
      if (isDescendant) {
        return { ...n, hidden: !isExpanding };
      }
      return n;
    });

    // Re-Run the Layout Engine!
    const visibleNodes = newNodes.filter((n) => !n.hidden);
    const layout = getLayoutedElements(visibleNodes, edges);

    // Merge the new positions back into our full list
    const finalNodes = newNodes.map((n) => {
      const layoutedNode = layout.nodes.find((ln) => ln.id === n.id);
      return layoutedNode || n;
    });

    setNodes(finalNodes);
  };

  const onAddChild = () => {
    if (!selectedNode) return;
    const newId = Math.random().toString();
    const newNode = {
      id: newId,
      type: 'mindmap',
      data: { label: 'New Node', summary: 'New Node summary' },
      position: { x: 0, y: 0 },
    };

    // Create the Connection
    const newEdge = {
      id: `e${selectedNode.id}-${newId}`,
      source: selectedNode.id,
      target: newId,
    };

    // Update the Data Arrays
    const updatedNodes = [...nodes, newNode];
    const updatedEdges = [...edges, newEdge];

    // Re-Run the Layout Engine
    const layout = getLayoutedElements(updatedNodes, updatedEdges);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  };


  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>

        {/* LEFT: The Graph */}
        <div style={{ flex: 1, height: '100%' }} className="bg-gray-50 border-r border-gray-200">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView>
            <Background color="#aaa" gap={16} />
            <Controls style={{ color: 'black' }} />
          </ReactFlow>
        </div>

        {/* RIGHT: The Sidebar */}
        <div className="w-80 bg-white p-5 shadow-xl mt-15">
          <h2 className="text-xl font-bold mb-4  text-gray-800">Details</h2>
          <div className=" pt-6 border-t border-gray-200">
            <button
              onClick={() => onExport({ nodes, edges })}
              className="w-full py-2 bg-gray-800 text-white font-bold rounded hover:bg-gray-700 transition"
            >
              💾 Save / Download JSON
            </button>
          </div>

          {selectedNode ? (
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-2">{selectedNode.data.label}</h3>
              <p className="text-sm text-gray-500 mb-4">{selectedNode.data.summary || "No summary."}</p>

              <div className="mt-4 pt-4 border-t">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Rename Node
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={onLabelChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="mt-4 pt-4 border-t">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Rename Node summary
                </label>
                <input
                  type="text"
                  value={selectedNode.data.summary}
                  onChange={onSummaryChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* NEW: Add Child Button */}
              <div className="mt-4">
                <button
                  onClick={onAddChild}
                  className="w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded hover:bg-blue-100 transition flex items-center justify-center gap-2"
                >
                  {/* Plus Icon */}
                  <span className="text-lg font-bold">+</span>
                  Add Child Node
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 mt-10 text-center">
              Click a node to edit it.
            </div>
          )}
        </div>

      </div>
    </>
  );
}