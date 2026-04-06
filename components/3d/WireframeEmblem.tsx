"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

function RotatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial transparent opacity={0} />
      <Edges threshold={15} color="#ffffff" linewidth={1} scale={1}>
        <lineBasicMaterial transparent opacity={0.12} color="#ffffff" />
      </Edges>
    </mesh>
  );
}

interface WireframeEmblemProps {
  style?: React.CSSProperties;
}

export default function WireframeEmblem({ style }: WireframeEmblemProps) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <RotatingIcosahedron />
      </Canvas>
    </div>
  );
}
