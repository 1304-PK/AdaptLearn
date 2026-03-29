import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

// ─── Custom Node ────────────────────────────────────────────────────────────

const COLORS = [
  { bg: "#FF4D4D", text: "#fff", shadow: "#FF4D4D" },   // red
  { bg: "#FF9F1C", text: "#fff", shadow: "#FF9F1C" },   // amber
  { bg: "#2EC4B6", text: "#fff", shadow: "#2EC4B6" },   // teal
  { bg: "#5C6BC0", text: "#fff", shadow: "#5C6BC0" },   // indigo
  { bg: "#A78BFA", text: "#fff", shadow: "#A78BFA" },   // violet
  { bg: "#34D399", text: "#fff", shadow: "#34D399" },   // emerald
  { bg: "#F472B6", text: "#fff", shadow: "#F472B6" },   // pink
  { bg: "#38BDF8", text: "#fff", shadow: "#38BDF8" },   // sky
];

function BlockNode({ data }) {
  const color = COLORS[data.colorIndex % COLORS.length];

  return (
    <div
      style={{
        background: color.bg,
        boxShadow: `0 0 24px ${color.shadow}55, 0 4px 16px #0008`,
        border: "1.5px solid rgba(255,255,255,0.13)",
        minWidth: 180,
        maxWidth: 260,
        borderRadius: 16,
        padding: "18px 22px",
        position: "relative",
        fontFamily: "'DM Mono', monospace",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Step badge */}
      <div
        style={{
          position: "absolute",
          top: -14,
          left: 16,
          background: "#0D0D0F",
          border: `1.5px solid ${color.bg}`,
          color: color.bg,
          borderRadius: 8,
          padding: "2px 10px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {`#${String(data.index + 1).padStart(2, "0")}`}
      </div>

      {/* Source handle (right) */}
      {!data.isLast && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: color.bg,
            width: 14,
            height: 14,
            border: "2.5px solid #0D0D0F",
            right: -7,
          }}
        />
      )}

      {/* Target handle (left) */}
      {!data.isFirst && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: color.bg,
            width: 14,
            height: 14,
            border: "2.5px solid #0D0D0F",
            left: -7,
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          marginTop: 8,
          color: color.text,
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.5,
          wordBreak: "break-word",
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

const nodeTypes = { block: BlockNode };

// ─── Edge style ─────────────────────────────────────────────────────────────

const edgeOptions = {
  type: "smoothstep",
  animated: true,
  style: {
    stroke: "#ffffff30",
    strokeWidth: 2.5,
  },
};

// ─── Array → nodes / edges ──────────────────────────────────────────────────

const NODE_GAP = 280;

function buildGraph(items) {
  const nodes = items.map((item, i) => ({
    id: `node-${i}`,
    type: "block",
    position: { x: i * NODE_GAP, y: 160 },
    data: {
      label: item.skill_name,
      index: i,
      colorIndex: i,
      isFirst: i === 0,
      isLast: i === items.length - 1,
    },
  }));

  const edges = items.slice(0, -1).map((_, i) => ({
    id: `edge-${i}-${i + 1}`,
    source: `node-${i}`,
    target: `node-${i + 1}`,
    ...edgeOptions,
  }));

  return { nodes, edges };
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * LinearFlow
 * @param {Array} items  - Any array; each element becomes a draggable block
 * @param {number} height - Canvas height in px (default 520)
 */
export default function LinearFlow({
  items,
  height = 520,
}) {
  const { nodes: initNodes, edges: initEdges } = useMemo(
    () => buildGraph(items),
    [items]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onInit = useCallback((instance) => {
    instance.fitView({ padding: 0.25 });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height,
        background: "#0D0D0F",
        borderRadius: 20,
        overflow: "hidden",
        border: "1.5px solid #ffffff12",
        boxShadow: "0 8px 48px #000a",
        position: "relative",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "14px 22px",
          background: "#0D0D0F",
          borderBottom: "1px solid #ffffff10",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ display: "flex", gap: 6 }}>
          {["#FF4D4D", "#FF9F1C", "#34D399"].map((c) => (
            <span
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: c,
                display: "inline-block",
              }}
            />
          ))}
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "white",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          ROADMAP - {items.length} NODES
        </span>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        minZoom={0.3}
        maxZoom={2}
        style={{ background: "#0D0D0F", paddingTop: 48 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#ffffff08"
          gap={28}
          size={1.5}
          variant="dots"
        />
        <Controls
          style={{
            background: "#1A1A1E",
            border: "1px solid #ffffff15",
            borderRadius: 10,
            boxShadow: "none",
          }}
        />
        <MiniMap
          nodeColor={(n) =>
            COLORS[n.data?.colorIndex % COLORS.length]?.bg ?? "#888"
          }
          style={{
            background: "#1A1A1E",
            border: "1px solid #ffffff15",
            borderRadius: 10,
          }}
          maskColor="#0D0D0Fcc"
        />
      </ReactFlow>
    </div>
  );
}