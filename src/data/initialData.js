export const initialNodes = [
  { id: '1', type: 'mindmap', label: 'Vitamins', data: { label: 'Vitamins', summary: 'Essential micronutrients.' , isRoot: true} },
  { id: '2', type: 'mindmap', label: 'Fat Soluble', data: { label: 'Fat Soluble', summary: 'Stored in fatty tissue.' } },
  { id: '3', type: 'mindmap', label: 'Water Soluble', data: { label: 'Water Soluble', summary: 'Need daily intake.' } },
  { id: '4', type: 'mindmap', label: 'Vitamin A', data: { label: 'Vitamin A', summary: 'Good for vision.' } },
  { id: '5', type: 'mindmap', label: 'Vitamin C', data: { label: 'Vitamin C', summary: 'Immunity booster.' } },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
];