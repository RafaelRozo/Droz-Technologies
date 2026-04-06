"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

function RotatingSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 24, 24]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

interface WireframeSphereProps {
  style?: React.CSSProperties;
}

export default function WireframeSphere({ style }: WireframeSphereProps) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <RotatingSphere />
      </Canvas>
    </div>
  );
}
