"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

interface NodeData {
  pos: THREE.Vector3;
  layer: number;
}

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Define network layers in 3D space
  const layers: NodeData[][] = useMemo(() => {
    const layerConfigs = [
      { count: 4, z: -3 },
      { count: 5, z: -1.5 },
      { count: 4, z: 0 },
      { count: 3, z: 1.5 },
      { count: 1, z: 3 },
    ];

    return layerConfigs.map((cfg, li) =>
      Array.from({ length: cfg.count }, (_, i) => ({
        pos: new THREE.Vector3(
          (i - (cfg.count - 1) / 2) * 1.2,
          (Math.random() - 0.5) * 0.3,
          cfg.z,
        ),
        layer: li,
      })),
    );
  }, []);

  const allNodes = useMemo(() => layers.flat(), [layers]);

  // Build connections between adjacent layers
  const connections = useMemo(() => {
    const conns: [THREE.Vector3, THREE.Vector3][] = [];
    for (let li = 0; li < layers.length - 1; li++) {
      for (const a of layers[li]) {
        for (const b of layers[li + 1]) {
          conns.push([a.pos, b.pos]);
        }
      }
    }
    return conns;
  }, [layers]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {allNodes.map((node, i) => (
        <mesh key={`n-${i}`} position={node.pos}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map((conn, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(conn);
        return (
          <lineSegments key={`c-${i}`} geometry={geom}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
          </lineSegments>
        );
      })}

      {/* Glow nodes at output */}
      <mesh position={layers[layers.length - 1][0].pos}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

interface NeuralNetwork3DProps {
  style?: React.CSSProperties;
}

export default function NeuralNetwork3D({ style }: NeuralNetwork3DProps) {
  return (
    <div style={{ width: "100%", height: 400, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 5, 15]} />
        <NetworkScene />
      </Canvas>
    </div>
  );
}
