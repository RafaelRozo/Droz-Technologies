"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

// ─── Helpers ────────────────────────────────────────────────────────────────

function edgesMaterial(opacity: number) {
  return (
    <lineBasicMaterial
      color="#ffffff"
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  );
}

// ─── Central Shaft ──────────────────────────────────────────────────────────

function Shaft() {
  const geo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.15, 0.15, 6, 16);
    // Rotate so the cylinder long axis aligns with X
    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    <lineSegments geometry={geo}>
      {edgesMaterial(0.18)}
    </lineSegments>
  );
}

// ─── Single Turbine Blade ────────────────────────────────────────────────────

function Blade({ angleRad }: { angleRad: number }) {
  // Blades lie along Z; rotated radially around X
  const geo = useMemo(() => {
    const g = new THREE.BoxGeometry(0.8, 0.05, 2);
    return new THREE.EdgesGeometry(g);
  }, []);

  // Each blade is a lineSegments that we rotate around X by angleRad
  // and then offset outward (along Y in the blade's local space, which
  // after the rotation maps to the radial direction).
  // We achieve the radial offset by placing the group at the shaft surface.
  const offsetY = 0.82; // half blade width (0.8/2) + shaft radius (0.15) + tiny gap
  return (
    <group rotation={[angleRad, 0, 0]}>
      {/* position the blade face outward from shaft */}
      <lineSegments geometry={geo} position={[0, offsetY, 0]}>
        {edgesMaterial(0.15)}
      </lineSegments>
    </group>
  );
}

// ─── Blade Ring — 8 blades ───────────────────────────────────────────────────

function BladeRing({ xOffset }: { xOffset?: number }) {
  const bladeCount = 8;
  return (
    <group position={[xOffset ?? 0, 0, 0]}>
      {Array.from({ length: bladeCount }, (_, i) => (
        <Blade key={i} angleRad={(i / bladeCount) * Math.PI * 2} />
      ))}
    </group>
  );
}

// ─── Bearing Housing ─────────────────────────────────────────────────────────

function BearingHousing({ x }: { x: number }) {
  // Outer ring
  const outerGeo = useMemo(() => {
    const g = new THREE.TorusGeometry(0.5, 0.1, 8, 32);
    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, []);

  // Inner bore ring
  const innerGeo = useMemo(() => {
    const g = new THREE.TorusGeometry(0.3, 0.04, 8, 24);
    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, []);

  // Housing block (the physical housing body around the bearing)
  const blockGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(0.25, 1.2, 1.2);
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    <group position={[x, 0, 0]}>
      <lineSegments geometry={outerGeo}>{edgesMaterial(0.18)}</lineSegments>
      <lineSegments geometry={innerGeo}>{edgesMaterial(0.12)}</lineSegments>
      <lineSegments geometry={blockGeo}>{edgesMaterial(0.1)}</lineSegments>
    </group>
  );
}

// ─── Vibration Sensor on bearing ─────────────────────────────────────────────

function VibrationSensor({ x }: { x: number }) {
  // Sensor body: small cylinder mounted radially on top of the housing
  const sensorGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8);
    return new THREE.EdgesGeometry(g);
  }, []);

  // Sensor cap (disc)
  const capGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.07, 0.07, 0.03, 8);
    return new THREE.EdgesGeometry(g);
  }, []);

  // Cable: a CatmullRom spline from sensor down and away
  const cableGeo = useMemo(() => {
    const points = [
      new THREE.Vector3(x, 0.75, 0),       // sensor top
      new THREE.Vector3(x - 0.2, 0.9, 0.2),
      new THREE.Vector3(x - 0.5, 0.7, 0.5),
      new THREE.Vector3(x - 0.9, 0.4, 0.7),
      new THREE.Vector3(x - 1.2, 0.1, 0.7),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
  }, [x]);

  // Connector box at cable end
  const connectorGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(0.12, 0.08, 0.08);
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    <group>
      {/* Sensor body mounted on top of bearing housing */}
      <group position={[x, 0.7, 0]}>
        <lineSegments geometry={sensorGeo}>{edgesMaterial(0.22)}</lineSegments>
        <lineSegments geometry={capGeo} position={[0, 0.115, 0]}>
          {edgesMaterial(0.18)}
        </lineSegments>
      </group>

      {/* Cable running away */}
      <lineSegments geometry={cableGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </lineSegments>

      {/* Connector */}
      <lineSegments
        geometry={connectorGeo}
        position={[x - 1.2, 0.1, 0.7]}
      >
        {edgesMaterial(0.14)}
      </lineSegments>
    </group>
  );
}

// ─── Keyway notch on shaft ────────────────────────────────────────────────────

function ShaftKeyway() {
  // Small rectangular notch cut into shaft surface — represented as a thin box
  const geo = useMemo(() => {
    const g = new THREE.BoxGeometry(1.2, 0.06, 0.06);
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    <lineSegments geometry={geo} position={[0, 0.15, 0]}>
      {edgesMaterial(0.12)}
    </lineSegments>
  );
}

// ─── End cap flanges ──────────────────────────────────────────────────────────

function ShaftFlange({ x }: { x: number }) {
  const geo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 12);
    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, []);

  // 4 bolt holes represented as tiny cylinders
  const boltHoleGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.03, 0.03, 0.1, 6);
    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    <group position={[x, 0, 0]}>
      <lineSegments geometry={geo}>{edgesMaterial(0.16)}</lineSegments>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <lineSegments
            key={i}
            geometry={boltHoleGeo}
            position={[0, Math.sin(a) * 0.2, Math.cos(a) * 0.2]}
          >
            {edgesMaterial(0.1)}
          </lineSegments>
        );
      })}
    </group>
  );
}

// ─── Full rotating assembly ───────────────────────────────────────────────────

function TurbineScene() {
  const assemblyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!assemblyRef.current) return;
    const t = clock.getElapsedTime();
    // Main rotation around X-axis (shaft axis)
    assemblyRef.current.rotation.x = t * 0.3;
    // Subtle vibration oscillation on Y (simulates imbalance)
    assemblyRef.current.position.y = Math.sin(t * 8) * 0.003;
  });

  return (
    <group ref={assemblyRef}>
      <Shaft />

      {/* Three blade rings spread along the shaft */}
      <BladeRing xOffset={-1.6} />
      <BladeRing xOffset={0} />
      <BladeRing xOffset={1.6} />

      {/* Bearing housings at shaft ends */}
      <BearingHousing x={-2.8} />
      <BearingHousing x={2.8} />

      {/* Flanges just inside the housings */}
      <ShaftFlange x={-2.4} />
      <ShaftFlange x={2.4} />

      <ShaftKeyway />

      {/* Vibration sensor on the right bearing housing */}
      <VibrationSensor x={2.8} />
    </group>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

interface TurbineAssemblyProps {
  style?: React.CSSProperties;
}

export default function TurbineAssembly({ style }: TurbineAssemblyProps) {
  return (
    <div style={{ width: "100%", height: 400, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 4, 12]} />
        <TurbineScene />
      </Canvas>
    </div>
  );
}
