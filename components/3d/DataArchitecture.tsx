"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneLighting from "./SceneLighting";

// ─── Server Rack Block ───────────────────────────────────────────────────────

interface ServerRackProps {
  position: [number, number, number];
  index: number;
  opacity: number;
}

function ServerRack({ position, index, opacity }: ServerRackProps) {
  const groupRef = useRef<THREE.Group>(null);

  const boxGeo = useMemo(() => new THREE.BoxGeometry(0.4, 0.8, 0.3), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  // LED positions on the front face (z = +0.15)
  const ledPositions = useMemo<[number, number, number][]>(
    () => [
      [-0.12, 0.28, 0.152],
      [-0.02, 0.28, 0.152],
      [0.08, 0.28, 0.152],
      [-0.12, 0.16, 0.152],
      [-0.02, 0.16, 0.152],
      [0.08, 0.16, 0.152],
    ],
    []
  );

  const ledRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    // Bob up/down at individual phase
    groupRef.current.position.y = position[1] + Math.sin(t + index) * 0.05;

    // Animate LED brightness individually
    ledRefs.current.forEach((led, i) => {
      if (!led) return;
      const mat = led.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(t * 3 + index * 1.7 + i * 2.3) * 0.3;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Server body wireframe */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={opacity} />
      </lineSegments>
      {/* Transparent body fill */}
      <mesh geometry={boxGeo}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.01} />
      </mesh>

      {/* LED indicators */}
      {ledPositions.map((lPos, i) => (
        <mesh
          key={`led-${i}`}
          position={lPos}
          ref={(el) => {
            ledRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={i % 2 === 0 ? 0.7 : 0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Central Database Cylinder ───────────────────────────────────────────────

function DatabaseCore() {
  const groupRef = useRef<THREE.Group>(null);

  const cylGeo = useMemo(() => new THREE.CylinderGeometry(0.28, 0.28, 0.55, 16), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(cylGeo), [cylGeo]);

  const diskGeo = useMemo(() => new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16), []);
  const diskEdges = useMemo(() => new THREE.EdgesGeometry(diskGeo), [diskGeo]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main cylinder */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </lineSegments>
      <mesh geometry={cylGeo}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
      </mesh>

      {/* Disk platters suggesting storage layers */}
      {[-0.22, 0, 0.22].map((yOff, i) => (
        <lineSegments key={`disk-${i}`} geometry={diskEdges} position={[0, yOff, 0]}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </lineSegments>
      ))}
    </group>
  );
}

// ─── Connection Lines Between Nodes ─────────────────────────────────────────

interface ConnectionLineProps {
  from: THREE.Vector3;
  to: THREE.Vector3;
  index: number;
}

function ConnectionLine({ from, to, index }: ConnectionLineProps) {
  const ref = useRef<THREE.LineSegments>(null);

  const points = useMemo(() => [from, to], [from, to]);
  const geo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.LineBasicMaterial;
    const t = clock.getElapsedTime();
    mat.opacity = 0.06 + Math.sin(t * 1.5 + index * 0.8) * 0.04;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </lineSegments>
  );
}

// ─── Floating Data Packets ────────────────────────────────────────────────────

interface DataPacketProps {
  from: THREE.Vector3;
  to: THREE.Vector3;
  offset: number;
  speed: number;
}

function DataPacket({ from, to, offset, speed }: DataPacketProps) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Animate t in [0,1] cycling with offset
    const cycle = ((t * speed + offset) % 1 + 1) % 1;
    pos.lerpVectors(from, to, cycle);
    ref.current.position.copy(pos);

    // Pulse opacity as it travels
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 + Math.sin(cycle * Math.PI) * 0.4;
  });

  return (
    <mesh ref={ref} position={[from.x, from.y, from.z]}>
      <boxGeometry args={[0.03, 0.03, 0.03]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
    </mesh>
  );
}

// ─── Full Scene ───────────────────────────────────────────────────────────────

function DataArchitectureScene() {
  const sceneRef = useRef<THREE.Group>(null);

  // 8 server racks arranged in a 2-row grid at varying heights
  const rackConfigs = useMemo<
    { position: [number, number, number]; opacity: number }[]
  >(
    () => [
      { position: [-1.4, 0.1, -1.2], opacity: 0.18 },
      { position: [-0.7, -0.15, -1.2], opacity: 0.14 },
      { position: [0.7, 0.2, -1.2], opacity: 0.2 },
      { position: [1.4, -0.1, -1.2], opacity: 0.16 },
      { position: [-1.4, 0.05, 1.2], opacity: 0.25 },
      { position: [-0.7, 0.25, 1.2], opacity: 0.15 },
      { position: [0.7, -0.05, 1.2], opacity: 0.2 },
      { position: [1.4, 0.15, 1.2], opacity: 0.18 },
    ],
    []
  );

  const dbPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const rackVectors = useMemo(
    () => rackConfigs.map((r) => new THREE.Vector3(...r.position)),
    [rackConfigs]
  );

  // Connections: each rack -> center DB, plus some rack-to-rack
  const connections = useMemo(() => {
    const conns: { from: THREE.Vector3; to: THREE.Vector3 }[] = [];
    rackVectors.forEach((rv) => {
      conns.push({ from: rv, to: dbPos });
    });
    // Cross connections between front and back row
    for (let i = 0; i < 4; i++) {
      conns.push({ from: rackVectors[i], to: rackVectors[i + 4] });
    }
    // Adjacent racks in same row
    conns.push({ from: rackVectors[0], to: rackVectors[1] });
    conns.push({ from: rackVectors[1], to: rackVectors[2] });
    conns.push({ from: rackVectors[2], to: rackVectors[3] });
    conns.push({ from: rackVectors[4], to: rackVectors[5] });
    conns.push({ from: rackVectors[5], to: rackVectors[6] });
    conns.push({ from: rackVectors[6], to: rackVectors[7] });
    return conns;
  }, [rackVectors, dbPos]);

  // 25 data packets — distributed across connections
  const packets = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const connIdx = i % connections.length;
      const conn = connections[connIdx];
      // Every other packet travels in reverse direction
      const from = i % 2 === 0 ? conn.from : conn.to;
      const to = i % 2 === 0 ? conn.to : conn.from;
      return {
        from: from.clone(),
        to: to.clone(),
        offset: i * 0.04,
        speed: 0.18 + (i % 5) * 0.04,
      };
    });
  }, [connections]);

  useFrame(({ clock }) => {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={sceneRef}>
      {/* Server racks */}
      {rackConfigs.map((cfg, i) => (
        <ServerRack
          key={`rack-${i}`}
          position={cfg.position}
          index={i}
          opacity={cfg.opacity}
        />
      ))}

      {/* Central database */}
      <DatabaseCore />

      {/* Connection lines */}
      {connections.map((conn, i) => (
        <ConnectionLine
          key={`conn-${i}`}
          from={conn.from}
          to={conn.to}
          index={i}
        />
      ))}

      {/* Data packets travelling along lines */}
      {packets.map((pkt, i) => (
        <DataPacket
          key={`pkt-${i}`}
          from={pkt.from}
          to={pkt.to}
          offset={pkt.offset}
          speed={pkt.speed}
        />
      ))}
    </group>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

interface DataArchitectureProps {
  style?: React.CSSProperties;
}

export default function DataArchitecture({ style }: DataArchitectureProps) {
  return (
    <div style={{ width: "100%", height: 400, ...style }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [2, 2, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <fog attach="fog" args={["#0a0a0a", 3, 10]} />
        <DataArchitectureScene />
      </Canvas>
    </div>
  );
}
