"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

function WaveformMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const segX = 200;
  const segY = 1;

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(12, 1, segX, segY);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i <= segX; i++) {
      for (let j = 0; j <= segY; j++) {
        const idx = (i * (segY + 1) + j) * 3;
        const x = arr[idx];
        arr[idx + 2] =
          Math.sin(x * 2 + t * 2) * 0.3 +
          Math.sin(x * 4.5 + t * 3) * 0.15 +
          Math.sin(x * 0.8 + t * 0.7) * 0.5;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[-0.3, 0, 0]} position={[0, -0.5, 0]}>
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

interface Waveform3DProps {
  style?: React.CSSProperties;
}

export default function Waveform3D({ style }: Waveform3DProps) {
  return (
    <div style={{ width: "100%", height: 300, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 5, 15]} />
        <WaveformMesh />
      </Canvas>
    </div>
  );
}
