"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

// ─── Outer Brain Shell ────────────────────────────────────────────────────────

function BrainShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2, 2);
    // Deform vertices to create an oval brain-like shape
    const pos = g.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      arr[i * 3] *= 1.1;      // x: wider
      arr[i * 3 + 1] *= 0.85; // y: shorter (flattened top)
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  return (
    <group>
      {/* Barely-visible wireframe outer shell */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.06} depthWrite={false} />
      </lineSegments>
      {/* Invisible fill mesh so depth testing still applies */}
      <mesh ref={meshRef} geometry={geo}>
        <meshBasicMaterial color="#000000" transparent opacity={0.0} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Inner Neural Nodes ───────────────────────────────────────────────────────

interface NodeDef {
  pos: THREE.Vector3;
  index: number;
}

function NeuralNodes({ nodes }: { nodes: NodeDef[] }) {
  // Each node has its own ref so we can animate opacity individually
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(t * 2 + i * 0.97) * 0.15 + 0.2;
    });
  });

  return (
    <>
      {nodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          position={node.pos}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
}

// ─── Connection Edges Between Nearby Nodes ───────────────────────────────────

function NeuralConnections({
  connections,
}: {
  connections: { from: THREE.Vector3; to: THREE.Vector3 }[];
}) {
  const geos = useMemo(
    () =>
      connections.map((c) =>
        new THREE.BufferGeometry().setFromPoints([c.from, c.to])
      ),
    [connections]
  );

  return (
    <>
      {geos.map((geo, i) => (
        <lineSegments key={`edge-${i}`} geometry={geo}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.07} depthWrite={false} />
        </lineSegments>
      ))}
    </>
  );
}

// ─── Synaptic Pulse Travelling Along a Connection ────────────────────────────

interface PulseState {
  fromIdx: number;
  toIdx: number;
  duration: number;
  startTime: number;
}

interface SynapticPulseProps {
  connections: { from: THREE.Vector3; to: THREE.Vector3 }[];
  pulseIndex: number;
  totalConnections: number;
}

function SynapticPulse({
  connections,
  pulseIndex,
  totalConnections,
}: SynapticPulseProps) {
  const ref = useRef<THREE.Mesh>(null);

  // Each pulse has a deterministic initial connection selection
  const stateRef = useRef<PulseState>({
    fromIdx: pulseIndex % totalConnections,
    toIdx: (pulseIndex + 1) % totalConnections,
    duration: 2.0 + (pulseIndex % 5) * 0.2,
    startTime: -(pulseIndex * 0.35), // stagger start times
  });

  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!ref.current || connections.length === 0) return;

    const t = clock.getElapsedTime();
    const state = stateRef.current;
    const elapsed = t + Math.abs(state.startTime);
    const cycle = elapsed / state.duration;
    const progress = cycle % 1;

    // When a new cycle begins, pick a new random connection
    if (Math.floor(cycle) !== Math.floor((elapsed - 0.016) / state.duration)) {
      const newConnIdx = Math.floor(Math.random() * connections.length);
      state.fromIdx = newConnIdx;
      state.toIdx = (newConnIdx + 1) % connections.length;
      state.duration = 2.0 + Math.random() * 1.0;
    }

    const conn = connections[state.fromIdx % connections.length];
    if (!conn) return;

    pos.lerpVectors(conn.from, conn.to, progress);
    ref.current.position.copy(pos);

    const mat = ref.current.material as THREE.MeshBasicMaterial;
    // Fade in at start, bright in middle, fade out at end
    mat.opacity = Math.sin(progress * Math.PI) * 0.6;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.0} />
    </mesh>
  );
}

// ─── Full Brain Scene ─────────────────────────────────────────────────────────

// Deterministic pseudo-random node placement within an oval brain volume
function generateBrainNodes(count: number): NodeDef[] {
  const nodes: NodeDef[] = [];
  // Use a seeded-like approach — fixed positions so they don't recompute on re-render
  const seed = [
    0.12, 0.73, 0.45, 0.89, 0.23, 0.56, 0.34, 0.91, 0.67, 0.08,
    0.48, 0.82, 0.15, 0.61, 0.37, 0.94, 0.29, 0.75, 0.52, 0.06,
    0.41, 0.87, 0.19, 0.63, 0.78, 0.32, 0.55, 0.97, 0.24, 0.70,
    0.43, 0.16, 0.88, 0.50, 0.03, 0.77, 0.35, 0.92, 0.60, 0.25,
    0.68, 0.11, 0.84, 0.47, 0.02, 0.74, 0.39, 0.95, 0.21, 0.58,
    0.80, 0.13, 0.66, 0.30, 0.53, 0.98, 0.42, 0.07, 0.85, 0.27,
  ];

  let si = 0;
  const nextRand = () => seed[si++ % seed.length];

  let attempts = 0;
  while (nodes.length < count && attempts < count * 20) {
    attempts++;
    // Sample uniformly in a sphere then check oval bounds
    const theta = nextRand() * Math.PI * 2;
    const phi = Math.acos(2 * nextRand() - 1);
    const r = Math.cbrt(nextRand()) * 1.5;

    const x = r * Math.sin(phi) * Math.cos(theta) * 1.1;
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
    const z = r * Math.cos(phi);

    // Reject if outside oval brain shell (leave a small inner margin)
    const normalizedDist =
      (x / 1.65) ** 2 + (y / 1.28) ** 2 + (z / 1.5) ** 2;
    if (normalizedDist > 0.88) continue;

    nodes.push({ pos: new THREE.Vector3(x, y, z), index: nodes.length });
  }

  return nodes;
}

function BrainScene() {
  const brainRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => generateBrainNodes(50), []);

  // Build connections between nodes within distance threshold
  const connections = useMemo(() => {
    const conns: { from: THREE.Vector3; to: THREE.Vector3 }[] = [];
    const threshold = 1.2;
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const dist = nodes[a].pos.distanceTo(nodes[b].pos);
        if (dist < threshold) {
          conns.push({ from: nodes[a].pos, to: nodes[b].pos });
        }
      }
    }
    return conns;
  }, [nodes]);

  const pulseCount = 12;

  useFrame(({ clock }) => {
    if (!brainRef.current) return;
    const t = clock.getElapsedTime();
    brainRef.current.rotation.y = t * 0.08;
    brainRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={brainRef}>
      <BrainShell />
      <NeuralNodes nodes={nodes} />
      <NeuralConnections connections={connections} />

      {/* Synaptic pulses — each independently picks its own connection */}
      {Array.from({ length: pulseCount }, (_, i) => (
        <SynapticPulse
          key={`pulse-${i}`}
          connections={connections}
          pulseIndex={i}
          totalConnections={connections.length}
        />
      ))}
    </group>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

interface NeuralBrainProps {
  style?: React.CSSProperties;
}

export default function NeuralBrain({ style }: NeuralBrainProps) {
  return (
    <div style={{ width: "100%", height: 400, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 3, 10]} />
        <BrainScene />
      </Canvas>
    </div>
  );
}
