"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

/* ─── Floating Particles ─── */
function Particles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;     // x: corridor width
      arr[i * 3 + 1] = Math.random() * 5;            // y: floor to ceiling
      arr[i * 3 + 2] = Math.random() * -60;           // z: depth
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      // Gentle float
      (pos.array as Float32Array)[iy] += Math.sin(t * 0.3 + i) * 0.001;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Grid Wall ─── */
function GridWall({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[60, 8, 60, 8]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.02}
      />
    </mesh>
  );
}

/* ─── Edge Lines ─── */
function CorridorEdges() {
  const lines = useMemo(() => {
    const pts: [number, number, number][][] = [
      // Floor-left edge
      [[-6, 0, 5], [-6, 0, -60]],
      // Floor-right edge
      [[6, 0, 5], [6, 0, -60]],
      // Ceiling-left edge
      [[-6, 5, 5], [-6, 5, -60]],
      // Ceiling-right edge
      [[6, 5, 5], [6, 5, -60]],
      // Vertical left-front
      [[-6, 0, 5], [-6, 5, 5]],
      // Vertical right-front
      [[6, 0, 5], [6, 5, 5]],
    ];
    return pts;
  }, []);

  return (
    <>
      {lines.map((pts, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(
          pts.map((p) => new THREE.Vector3(...p)),
        );
        return (
          <lineSegments key={i} geometry={geom}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
          </lineSegments>
        );
      })}
    </>
  );
}

/* ─── Section Markers ─── */
function SectionMarkers() {
  const markers = useMemo(
    () => [-8, -20, -32, -44, -56].map((z) => z),
    [],
  );

  return (
    <>
      {markers.map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.04} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

/* ─── Camera Controller ─── */
function ScrollCamera({ progress }: { progress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Dolly camera forward based on scroll progress
    const targetZ = 3 - progress * 55;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y = 1.6;
    camera.position.x = Math.sin(progress * Math.PI * 0.5) * 0.3;
    camera.lookAt(0, 1.6, camera.position.z - 10);
  });

  return null;
}

/* ─── Main Scene ─── */
interface CorridorSceneProps {
  scrollProgress?: number;
  style?: React.CSSProperties;
}

export default function CorridorScene({
  scrollProgress = 0,
  style,
}: CorridorSceneProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.6, 3], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 10, 55]} />

        {/* Left wall */}
        <GridWall position={[-6, 2.5, -25]} rotation={[0, Math.PI / 2, 0]} />
        {/* Right wall */}
        <GridWall position={[6, 2.5, -25]} rotation={[0, -Math.PI / 2, 0]} />
        {/* Floor */}
        <GridWall position={[0, 0, -25]} rotation={[-Math.PI / 2, 0, 0]} />
        {/* Ceiling */}
        <GridWall position={[0, 5, -25]} rotation={[Math.PI / 2, 0, 0]} />

        <CorridorEdges />
        <SectionMarkers />
        <Particles count={250} />
        <ScrollCamera progress={scrollProgress} />
      </Canvas>
    </div>
  );
}
