import { getOutgoers } from '@xyflow/react';

export const getDescendants = (nodes, edges, nodeId) => {
  const result = [];
  
  // Find immediate children of the specific node we clicked
  const outgoers = getOutgoers({ id: nodeId }, nodes, edges);
  
  // recursion for grand childrens
  outgoers.forEach((node) => {
    result.push(node);
    const childDescendants = getDescendants(nodes, edges, node.id);
    result.push(...childDescendants);
  });

  return result;
};