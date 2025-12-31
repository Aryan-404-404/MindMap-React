# 🧠 Interactive Mind Map (React Flow)

A dynamic, interactive Mind Map application built with **React** and **React Flow**. This project allows users to visualize hierarchical data, manage nodes (add, edit, delete), and reorganize the structure with an automated layout engine.

**[👉 View Live Demo](https://mind-map-react-three.vercel.app/)**

---

## ✨ Features

* **👀 Visualization:** Automatically renders hierarchical data into a clean, tree-like structure using the **Dagre** layout engine.
* **➕ Dynamic Updates:**
    * **Add Nodes:** Create new child nodes dynamically with a single click.
    * **Edit Nodes:** Real-time renaming of nodes via a sidebar interface.
* **📂 Expand & Collapse:** Click any parent node to toggle visibility of its children (Recursive collapse logic).
* **ℹ️ Rich Information:**
    * **Sidebar Details:** View detailed information/paragraphs for selected nodes.
    * **Visual Badges:** Nodes with hidden children show a pulsing `+` badge.
* **💾 Export Data:** Download the current state of the mind map as a `.json` file.
* **🎨 Responsive Design:** Built with **Tailwind CSS** for a clean, modern UI that works on split-screen.

---

## 🛠️ Tech Stack

* **Frontend Library:** [React.js](https://reactjs.org/) (Vite)
* **Visualization:** [@xyflow/react](https://reactflow.dev/) (React Flow)
* **Layout Engine:** [dagre](https://github.com/dagrejs/dagre) (Directed Graph Layout)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons/Components:** Custom SVG components & Standard HTML5

---
## 🏗️ Architecture & Data Flow

### 1. Data Initialization (`src/data/initialData.js`)
The application starts with a static JSON-like dataset defining the initial nodes and edges. This strictly separates **data** from **UI logic**.

### 2. Layout Calculation (`src/utils/layout.js`)
Before rendering, the raw data is passed to the **Dagre** layout engine.
* **Input:** Flat arrays of nodes and edges.
* **Process:** Dagre calculates the `x` and `y` coordinates for a hierarchical tree structure (Left-to-Right).
* **Output:** Positioned nodes ready for the React Flow canvas.

### 3. State Management (`App.jsx`)
The positioned data is stored in React Flow's `useNodesState` and `useEdgesState` hooks.
* **Interactions:** User actions (clicking, expanding) update this state.
* **Re-Layout:** When a branch expands/collapses, the layout engine runs again on the visible nodes to maintain a clean structure.

### 4. Component Rendering
* **`MindMapNode.jsx`:** A custom component renders individual nodes. It uses the `useReactFlow` hook to query the graph state (e.g., to check for hidden children) and render visual cues (badges/tooltips).

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/mind-map-react.git](https://github.com/your-username/mind-map-react.git)
    cd mind-map-react
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

---

## 📖 Usage Guide

1.  **Exploring the Graph:**
    * **Drag** the canvas to move around.
    * **Scroll** to zoom in/out.
    * **Click** on a node ("Fat Soluble") to collapse its children. A **(+)** badge will appear to indicate hidden content. Click again to expand.

2.  **Editing Nodes:**
    * Click on any node to select it.
    * The **Sidebar** on the right will show details.
    * Type in the "Rename Node" input box to change the label instantly.

3.  **Adding New Nodes:**
    * Select a node (e.g., "Vitamin A").
    * Click the **"+ Add Child Node"** button in the sidebar.
    * A new node will appear attached to the parent.

4.  **Exporting:**
    * Click the **"💾 Save / Download JSON"** button at the bottom of the sidebar to save your current map structure.

---

## 📂 Project Structure

```bash
src/
├── components/
│   └── MindMapNode.jsx    # Custom Node UI (Badge, Handles, Tooltip)
├── data/
│   └── initialData.js     # Starting JSON data (Vitamins dataset)
├── utils/
│   ├── graphUtils.js      # Recursive logic (getDescendants)
│   ├── layout.js          # Dagre layout configuration
│   └── export.js          # JSON download logic
├── App.jsx                # Main Application Logic (State, Handlers)
└── main.jsx               # Entry point
