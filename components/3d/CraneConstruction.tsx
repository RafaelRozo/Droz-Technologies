"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

// ─── Tower Mast ──────────────────────────────────────────────────────────────

function TowerMast() {
  const geo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.1, 5, 8), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  return (
    <group position={[0, 0.5, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </lineSegments>
      <mesh geometry={geo}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.01} />
      </mesh>
    </group>
  );
}

// ─── Rotating Crane Head (Jib + Counter-Jib + Hook) ──────────────────────────

function CraneHead() {
  const headRef = useRef<THREE.Group>(null);
  const hookGroupRef = useRef<THREE.Group>(null);

  const jibGeo = useMemo(() => new THREE.BoxGeometry(4, 0.12, 0.12), []);
  const jibEdges = useMemo(() => new THREE.EdgesGeometry(jibGeo), [jibGeo]);

  const counterJibGeo = useMemo(() => new THREE.BoxGeometry(1.5, 0.1, 0.1), []);
  const counterJibEdges = useMemo(
    () => new THREE.EdgesGeometry(counterJibGeo),
    [counterJibGeo]
  );

  const counterWeightGeo = useMemo(
    () => new THREE.BoxGeometry(0.3, 0.25, 0.25),
    []
  );
  const counterWeightEdges = useMemo(
    () => new THREE.EdgesGeometry(counterWeightGeo),
    [counterWeightGeo]
  );

  const hookBoxGeo = useMemo(() => new THREE.BoxGeometry(0.12, 0.1, 0.12), []);
  const hookBoxEdges = useMemo(
    () => new THREE.EdgesGeometry(hookBoxGeo),
    [hookBoxGeo]
  );

  // Hook rope as a line
  const ropeGeo = useMemo(() => {
    const pts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -1.2, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (headRef.current) {
      headRef.current.rotation.y = t * 0.05;
    }
    if (hookGroupRef.current) {
      // Pendulum sway on the hook
      const swayX = Math.sin(t * 0.7) * 0.08;
      const swayZ = Math.sin(t * 0.5 + 1.2) * 0.05;
      hookGroupRef.current.rotation.x = swayX;
      hookGroupRef.current.rotation.z = swayZ;
    }
  });

  return (
    <group ref={headRef} position={[0, 3, 0]}>
      {/* Main jib — extends to the right (+x), pivoted so center is at +1 offset */}
      <group position={[1.0, 0, 0]}>
        <lineSegments geometry={jibEdges}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.16} />
        </lineSegments>
        <mesh geometry={jibGeo}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.01} />
        </mesh>
      </group>

      {/* Counter-jib — extends to the left */}
      <group position={[-1.25, 0, 0]}>
        <lineSegments geometry={counterJibEdges}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.14} />
        </lineSegments>
      </group>

      {/* Counter weight at far left */}
      <group position={[-2.1, -0.1, 0]}>
        <lineSegments geometry={counterWeightEdges}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </lineSegments>
      </group>

      {/* Hook assembly dangling from jib end */}
      <group position={[2.8, 0, 0]}>
        <group ref={hookGroupRef}>
          {/* Rope line */}
          <lineSegments geometry={ropeGeo}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
          </lineSegments>
          {/* Hook box at rope end */}
          <group position={[0, -1.3, 0]}>
            <lineSegments geometry={hookBoxEdges}>
              <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
            </lineSegments>
          </group>
        </group>
      </group>
    </group>
  );
}

// ─── Building Under Construction ─────────────────────────────────────────────

function BuildingStructure() {
  const slabGeo = useMemo(() => new THREE.BoxGeometry(3, 0.1, 2), []);
  const slabEdges = useMemo(() => new THREE.EdgesGeometry(slabGeo), [slabGeo]);

  const colGeo = useMemo(() => new THREE.CylinderGeometry(0.06, 0.06, 1.0, 6), []);
  const colEdges = useMemo(() => new THREE.EdgesGeometry(colGeo), [colGeo]);

  const floorCount = 4;
  const floorHeight = 1.0;
  // Column positions at corners of each floor slab
  const cornerOffsets: [number, number][] = [
    [-1.3, -0.8],
    [1.3, -0.8],
    [-1.3, 0.8],
    [1.3, 0.8],
  ];

  return (
    <group position={[0, -2.5, 0]}>
      {Array.from({ length: floorCount }, (_, fi) => {
        const y = fi * floorHeight;
        return (
          <group key={`floor-${fi}`}>
            {/* Floor slab */}
            <lineSegments geometry={slabEdges} position={[0, y, 0]}>
              <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
            </lineSegments>

            {/* Columns between this floor and the next */}
            {cornerOffsets.map(([cx, cz], ci) => (
              <lineSegments
                key={`col-${fi}-${ci}`}
                geometry={colEdges}
                position={[cx, y + 0.5, cz]}
              >
                <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
              </lineSegments>
            ))}
          </group>
        );
      })}
    </group>
  );
}

// ─── Scaffolding on one side ──────────────────────────────────────────────────

function Scaffolding() {
  const lines = useMemo(() => {
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    const x = -1.7; // right side of building
    const floors = 4;
    const floorH = 1.0;

    // Vertical poles at two depths
    for (const z of [-0.9, 0.9]) {
      for (let fi = 0; fi <= floors; fi++) {
        const yStart = -2.5 + fi * floorH;
        if (fi < floors) {
          segments.push([
            new THREE.Vector3(x, yStart, z),
            new THREE.Vector3(x, yStart + floorH, z),
          ]);
        }
      }
    }

    // Horizontal ledger boards at each floor level
    for (let fi = 0; fi <= floors; fi++) {
      const y = -2.5 + fi * floorH;
      segments.push([
        new THREE.Vector3(x, y, -0.9),
        new THREE.Vector3(x, y, 0.9),
      ]);
    }

    // Cross bracing diagonals
    for (let fi = 0; fi < floors; fi++) {
      const yBottom = -2.5 + fi * floorH;
      const yTop = yBottom + floorH;
      segments.push([
        new THREE.Vector3(x, yBottom, -0.9),
        new THREE.Vector3(x, yTop, 0.9),
      ]);
      segments.push([
        new THREE.Vector3(x, yBottom, 0.9),
        new THREE.Vector3(x, yTop, -0.9),
      ]);
    }

    return segments;
  }, []);

  return (
    <>
      {lines.map((seg, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(seg);
        return (
          <lineSegments key={`scaf-${i}`} geometry={geo}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </lineSegments>
        );
      })}
    </>
  );
}

// ─── I-Beams leaning against the structure ───────────────────────────────────

function IBeams() {
  const beamGeo = useMemo(() => new THREE.BoxGeometry(0.06, 2.0, 0.12), []);
  const beamEdges = useMemo(() => new THREE.EdgesGeometry(beamGeo), [beamGeo]);

  const beamConfigs: {
    position: [number, number, number];
    rotation: [number, number, number];
  }[] = [
    { position: [1.8, -1.6, 0.5], rotation: [0, 0, 0.35] },
    { position: [1.9, -1.5, -0.3], rotation: [0.1, 0.2, 0.28] },
    { position: [2.0, -1.7, 0.0], rotation: [-0.05, 0, 0.32] },
  ];

  return (
    <>
      {beamConfigs.map((cfg, i) => (
        <lineSegments
          key={`beam-${i}`}
          geometry={beamEdges}
          position={cfg.position}
          rotation={cfg.rotation}
        >
          <lineBasicMaterial color="#ffffff" transparent opacity={0.14} />
        </lineSegments>
      ))}
    </>
  );
}

// ─── Construction Grid on Ground ─────────────────────────────────────────────

function GroundGrid() {
  const lines = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    const size = 6;
    const step = 0.5;

    for (let x = -size; x <= size; x += step) {
      segs.push([new THREE.Vector3(x, 0, -size), new THREE.Vector3(x, 0, size)]);
    }
    for (let z = -size; z <= size; z += step) {
      segs.push([new THREE.Vector3(-size, 0, z), new THREE.Vector3(size, 0, z)]);
    }
    return segs;
  }, []);

  return (
    <>
      {lines.map((seg, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(seg);
        return (
          <lineSegments key={`grid-${i}`} geometry={geo} position={[0, -2.6, 0]}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </lineSegments>
        );
      })}
    </>
  );
}

// ─── Full Scene ───────────────────────────────────────────────────────────────

function CraneConstructionScene() {
  return (
    <group>
      <TowerMast />
      <CraneHead />
      <BuildingStructure />
      <Scaffolding />
      <IBeams />
      <GroundGrid />
    </group>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

interface CraneConstructionProps {
  style?: React.CSSProperties;
}

export default function CraneConstruction({ style }: CraneConstructionProps) {
  return (
    <div style={{ width: "100%", height: 400, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [4, 3, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 5, 15]} />
        <CraneConstructionScene />
      </Canvas>
    </div>
  );
}
