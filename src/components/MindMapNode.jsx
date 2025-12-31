import { Handle, Position, useReactFlow } from '@xyflow/react'

const MindMapNode = ({ id, data }) => {

    const {getNodes, getEdges} = useReactFlow()
    const outGoingEdges = getEdges().filter((edge)=>edge.source===id)

    const childNodes = getNodes().filter((node)=>
        outGoingEdges.some((edge)=> edge.target===node.id))
    const hasHiddenChildren = childNodes.some((node)=>node.hidden)

    const isRoot = data.isRoot;

    return (
        <div className={`px-5 py-3 shadow-lg rounded-full border-2 min-w-37.5 text-center ${isRoot
                ? 'bg-blue-100 border-blue-500 text-blue-900 font-bold'
                : 'bg-green-50 border-green-500 text-green-900 font-medium'
            }`}>
            {!isRoot && (
                <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400" />
            )}
            <div>{data.label}</div>
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-400" />
            {hasHiddenChildren && (
                <div className="absolute -bottom-2 -right-2 w-6 text-white h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm pointer-events-none animate-pulse pb-[2px]">
                    +
                </div>
            )}
        </div>
    )
}

export default MindMapNode
