"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

function gearShape(innerR: number, outerR: number, teeth: number): THREE.Shape {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const a1 = i * step;
    const a2 = a1 + step * 0.3;
    const a3 = a1 + step * 0.5;
    const a4 = a1 + step * 0.8;
    const nextA = (i + 1) * step;

    if (i === 0) {
      shape.moveTo(outerR * Math.cos(a1), outerR * Math.sin(a1));
    }
    shape.lineTo(outerR * Math.cos(a2), outerR * Math.sin(a2));
    shape.lineTo(innerR * Math.cos(a3), innerR * Math.sin(a3));
    shape.lineTo(innerR * Math.cos(a4), innerR * Math.sin(a4));
    shape.lineTo(outerR * Math.cos(nextA), outerR * Math.sin(nextA));
  }

  return shape;
}

function ExtrudedGear({
  innerR,
  outerR,
  teeth,
  depth,
  position,
  speed,
}: {
  innerR: number;
  outerR: number;
  teeth: number;
  depth: number;
  position: [number, number, number];
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shape = gearShape(innerR, outerR, teeth);
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
    });
  }, [innerR, outerR, teeth, depth]);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
  });

  return (
    <group ref={ref} position={position}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </lineSegments>
      {/* Hub circle */}
      <mesh>
        <torusGeometry args={[innerR * 0.3, 0.02, 8, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

interface GearSystem3DProps {
  style?: React.CSSProperties;
}

export default function GearSystem3D({ style }: GearSystem3DProps) {
  return (
    <div style={{ width: "100%", height: 350, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 4, 12]} />
        <ExtrudedGear innerR={0.8} outerR={1.2} teeth={14} depth={0.3} position={[-0.8, 0, 0]} speed={0.2} />
        <ExtrudedGear innerR={0.5} outerR={0.8} teeth={10} depth={0.3} position={[1.2, 0.6, 0]} speed={-0.28} />
      </Canvas>
    </div>
  );
}
