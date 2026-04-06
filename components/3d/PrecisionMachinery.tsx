"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

function boxEdges(
  w: number,
  h: number,
  d: number,
): THREE.EdgesGeometry {
  return new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
}

// ─── Base Plate ───────────────────────────────────────────────────────────────

function BasePlate() {
  const geo = useMemo(() => boxEdges(4, 0.2, 3), []);
  // Surface grid lines — subdivided plane to look like a machining table
  const gridGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(4, 3, 8, 6);
    g.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, []);

  // T-slot grooves: 3 thin boxes along Z axis
  const slotGeo = useMemo(() => boxEdges(3.8, 0.04, 0.1), []);

  return (
    <group position={[0, 0, 0]}>
      <lineSegments geometry={geo}>{edgesMaterial(0.18)}</lineSegments>
      <lineSegments geometry={gridGeo} position={[0, 0.1, 0]}>
        {edgesMaterial(0.07)}
      </lineSegments>
      {[-0.8, 0, 0.8].map((z, i) => (
        <lineSegments key={i} geometry={slotGeo} position={[0, 0.1, z]}>
          {edgesMaterial(0.1)}
        </lineSegments>
      ))}
    </group>
  );
}

// ─── Vertical Column ──────────────────────────────────────────────────────────

function VerticalColumn() {
  const bodyGeo = useMemo(() => boxEdges(0.6, 3, 0.6), []);

  // Ribbing on the column face for structural realism
  const ribGeo = useMemo(() => boxEdges(0.05, 2.6, 0.62), []);

  // Base flange
  const flangeGeo = useMemo(() => boxEdges(1.0, 0.12, 1.0), []);

  // Linear guide rails on the front face of the column
  const railGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.04, 0.04, 2.8, 6);
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    // Column sits on the left of the base plate, centered in Z
    <group position={[-1.6, 1.6, 0]}>
      <lineSegments geometry={bodyGeo}>{edgesMaterial(0.18)}</lineSegments>

      {/* Two ribs */}
      {[-0.18, 0.18].map((x, i) => (
        <lineSegments key={i} geometry={ribGeo} position={[x, 0, 0]}>
          {edgesMaterial(0.08)}
        </lineSegments>
      ))}

      {/* Base flange */}
      <lineSegments geometry={flangeGeo} position={[0, -1.5, 0]}>
        {edgesMaterial(0.14)}
      </lineSegments>

      {/* Two linear guide rails */}
      {[-0.18, 0.18].map((x, i) => (
        <lineSegments key={i} geometry={railGeo} position={[x, 0, 0.32]}>
          {edgesMaterial(0.12)}
        </lineSegments>
      ))}
    </group>
  );
}

// ─── Spindle + Drill Bit (inner components of moving arm) ────────────────────

function Spindle() {
  // Spindle housing cylinder
  const housingGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.18, 0.18, 0.6, 12);
    return new THREE.EdgesGeometry(g);
  }, []);

  // Collet chuck (slightly tapered)
  const chuckGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.12, 0.08, 0.2, 10);
    return new THREE.EdgesGeometry(g);
  }, []);

  // Drill bit (thin cone)
  const bitGeo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.05, 0.5, 8);
    return new THREE.EdgesGeometry(g);
  }, []);

  // Flutes on the bit — two thin planes crossing
  const fluteGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(0.01, 0.45, 0.06);
    return new THREE.EdgesGeometry(g);
  }, []);

  const spindleRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!spindleRef.current) return;
    spindleRef.current.rotation.y = clock.getElapsedTime() * 2;
  });

  return (
    // Attached below the arm; arm offset handled by parent
    <group position={[0, -0.28, 0]}>
      {/* Static housing */}
      <lineSegments geometry={housingGeo}>{edgesMaterial(0.17)}</lineSegments>
      <lineSegments geometry={chuckGeo} position={[0, -0.4, 0]}>
        {edgesMaterial(0.15)}
      </lineSegments>

      {/* Rotating bit + flutes */}
      <group ref={spindleRef} position={[0, -0.7, 0]}>
        <lineSegments geometry={bitGeo} position={[0, -0.25, 0]}>
          {edgesMaterial(0.18)}
        </lineSegments>
        {[0, Math.PI / 2].map((rot, i) => (
          <lineSegments
            key={i}
            geometry={fluteGeo}
            rotation={[0, rot, 0]}
            position={[0, -0.22, 0]}
          >
            {edgesMaterial(0.1)}
          </lineSegments>
        ))}
      </group>
    </group>
  );
}

// ─── Horizontal Arm (CNC travel) ──────────────────────────────────────────────

function HorizontalArm() {
  const armRef = useRef<THREE.Group>(null);

  // Arm body
  const armGeo = useMemo(() => boxEdges(3, 0.3, 0.3), []);

  // Rail carriage (slides along the arm)
  const carriageGeo = useMemo(() => boxEdges(0.5, 0.38, 0.38), []);

  // Drag chain cable carrier
  const chainSegGeo = useMemo(() => boxEdges(0.14, 0.1, 0.12), []);

  useFrame(({ clock }) => {
    if (!armRef.current) return;
    const t = clock.getElapsedTime();
    // CNC travel: arm moves left-right on X
    armRef.current.position.x = Math.sin(t * 0.5) * 1.5 - 0.1;
  });

  // Arm is attached to the column's Z-rail; starts at column top
  // column center is at X=-1.6, Y=3.1
  return (
    <group ref={armRef} position={[-0.1, 3.1, 0]}>
      {/* Main arm */}
      <lineSegments geometry={armGeo} position={[0.9, 0, 0]}>
        {edgesMaterial(0.17)}
      </lineSegments>

      {/* Carriage riding the arm */}
      <lineSegments geometry={carriageGeo} position={[1.4, 0, 0]}>
        {edgesMaterial(0.13)}
      </lineSegments>

      {/* Cable drag chain — 6 segments */}
      {Array.from({ length: 6 }, (_, i) => (
        <lineSegments
          key={i}
          geometry={chainSegGeo}
          position={[0.25 + i * 0.16, 0.25, 0]}
        >
          {edgesMaterial(0.08)}
        </lineSegments>
      ))}

      {/* Spindle at end of arm */}
      <group position={[2.2, 0, 0]}>
        <Spindle />
      </group>
    </group>
  );
}

// ─── Workpiece ────────────────────────────────────────────────────────────────

function Workpiece() {
  const bodyGeo = useMemo(() => boxEdges(0.8, 0.25, 0.6), []);
  // Step cut into the top — a thinner layer offset
  const stepGeo = useMemo(() => boxEdges(0.4, 0.12, 0.6), []);
  // Hole (represented as a short cylinder)
  const holeGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.07, 0.07, 0.26, 10);
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    // Sits on the base plate near center
    <group position={[0.5, 0.225, 0]}>
      <lineSegments geometry={bodyGeo}>{edgesMaterial(0.16)}</lineSegments>
      <lineSegments geometry={stepGeo} position={[-0.2, 0.185, 0]}>
        {edgesMaterial(0.12)}
      </lineSegments>
      <lineSegments geometry={holeGeo} position={[0.15, 0, 0]}>
        {edgesMaterial(0.12)}
      </lineSegments>
    </group>
  );
}

// ─── Gear (extruded profile) ──────────────────────────────────────────────────

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

function ColumnGear({
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

  const geo = useMemo(() => {
    const shape = gearShape(innerR, outerR, teeth);
    const extruded = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
    });
    return new THREE.EdgesGeometry(extruded);
  }, [innerR, outerR, teeth, depth]);

  // Hub bore
  const hubGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(innerR * 0.35, innerR * 0.35, depth + 0.02, 12);
    g.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    return new THREE.EdgesGeometry(g);
  }, [innerR, depth]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
  });

  return (
    <group ref={ref} position={position}>
      <lineSegments geometry={geo}>{edgesMaterial(0.13)}</lineSegments>
      <lineSegments geometry={hubGeo}>{edgesMaterial(0.1)}</lineSegments>
    </group>
  );
}

// Three interlocking gears mounted on the column's right face
function GearAssembly() {
  // All gears sit on the right face of the column (X = -1.3) in the YZ plane
  return (
    <group position={[-1.28, 2.4, 0.32]} rotation={[0, Math.PI / 2, 0]}>
      {/* Large drive gear */}
      <ColumnGear
        innerR={0.22}
        outerR={0.38}
        teeth={14}
        depth={0.12}
        position={[0, 0, 0]}
        speed={0.4}
      />
      {/* Medium idler gear — meshes with large */}
      <ColumnGear
        innerR={0.14}
        outerR={0.24}
        teeth={9}
        depth={0.12}
        position={[0, 0.62, 0]}
        speed={-0.62}
      />
      {/* Small output gear — meshes with medium */}
      <ColumnGear
        innerR={0.09}
        outerR={0.15}
        teeth={6}
        depth={0.12}
        position={[0.37, 0.78, 0]}
        speed={1.05}
      />
    </group>
  );
}

// ─── Coordinate Axes ──────────────────────────────────────────────────────────

function CoordinateAxes() {
  const origin = new THREE.Vector3(-1.8, 0.25, 1.7);
  const len = 0.45;

  const axes = useMemo<Array<{ end: THREE.Vector3; opacity: number }>>(() => [
    { end: new THREE.Vector3(origin.x + len, origin.y, origin.z),   opacity: 0.2 },
    { end: new THREE.Vector3(origin.x, origin.y + len, origin.z),   opacity: 0.2 },
    { end: new THREE.Vector3(origin.x, origin.y, origin.z - len),   opacity: 0.2 },
  ], []);

  // Arrow heads as tiny cones
  const arrowGeo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.025, 0.08, 6);
    return new THREE.EdgesGeometry(g);
  }, []);

  return (
    <>
      {axes.map(({ end, opacity }, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints([origin, end]);
        const dir = end.clone().sub(origin).normalize();
        // Quaternion to rotate cone (default up = +Y) to direction
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir,
        );
        return (
          <group key={i}>
            <lineSegments geometry={geom}>
              <lineBasicMaterial color="#ffffff" transparent opacity={opacity} />
            </lineSegments>
            <lineSegments
              geometry={arrowGeo}
              position={end.clone().add(dir.clone().multiplyScalar(0.04))}
              quaternion={quaternion}
            >
              {edgesMaterial(opacity)}
            </lineSegments>
          </group>
        );
      })}

      {/* Tick marks along X axis */}
      {[0.15, 0.3].map((t, i) => {
        const tickGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(origin.x + t, origin.y - 0.05, origin.z),
          new THREE.Vector3(origin.x + t, origin.y + 0.05, origin.z),
        ]);
        return (
          <lineSegments key={i} geometry={tickGeo}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </lineSegments>
        );
      })}
    </>
  );
}

// ─── Coolant Nozzle ───────────────────────────────────────────────────────────

function CoolantNozzle() {
  // Mounted near the spindle on the arm; pipe going to the tip
  const pipeGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6);
    g.applyMatrix4(
      new THREE.Matrix4().makeRotationZ(Math.PI / 4),
    );
    return new THREE.EdgesGeometry(g);
  }, []);

  const tipGeo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.04, 0.1, 6);
    return new THREE.EdgesGeometry(g);
  }, []);

  const armRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!armRef.current) return;
    const t = clock.getElapsedTime();
    armRef.current.position.x = Math.sin(t * 0.5) * 1.5 + 2.1;
  });

  return (
    <group ref={armRef} position={[2.1, 2.85, 0.18]}>
      <lineSegments geometry={pipeGeo} position={[0, 0.18, 0]}>
        {edgesMaterial(0.12)}
      </lineSegments>
      <lineSegments
        geometry={tipGeo}
        position={[0.18, 0.05, 0]}
        rotation={[0, 0, -Math.PI / 4]}
      >
        {edgesMaterial(0.12)}
      </lineSegments>
    </group>
  );
}

// ─── Full Scene ───────────────────────────────────────────────────────────────

function MachineryScene() {
  return (
    <group>
      <BasePlate />
      <VerticalColumn />
      <HorizontalArm />
      <GearAssembly />
      <Workpiece />
      <CoolantNozzle />
      <CoordinateAxes />
    </group>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

interface PrecisionMachineryProps {
  style?: React.CSSProperties;
}

export default function PrecisionMachinery({ style }: PrecisionMachineryProps) {
  return (
    <div style={{ width: "100%", height: 400, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [3, 3, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 4, 12]} />
        <MachineryScene />
      </Canvas>
    </div>
  );
}
