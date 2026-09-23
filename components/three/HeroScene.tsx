"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero scene: a drifting neural / agent graph.
 * Nodes float in a shallow volume, edges connect nearest neighbours,
 * and amber "signals" travel along a subset of edges - the visual
 * metaphor for reasoning propagating through a network.
 *
 * Cool blue network + a single amber signal accent.
 */

const NODE_COUNT = 46;
const ACCENT = new THREE.Color("#E8B04B");
const NODE_COLOR = new THREE.Color("#93A3BC");
const EDGE_COLOR = new THREE.Color("#4D8DF0");

type GraphData = {
  positions: THREE.Vector3[];
  edges: [number, number][];
};

function buildGraph(): GraphData {
  // Deterministic pseudo-random layout for stable SSR-free hydration.
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    positions.push(
      new THREE.Vector3(
        (rand() - 0.5) * 9,
        (rand() - 0.5) * 5.2,
        (rand() - 0.5) * 4.5,
      ),
    );
  }

  // Connect each node to its 2-3 nearest neighbours (dedup).
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  positions.forEach((p, i) => {
    const dists = positions
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    dists.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    });
  });

  return { positions, edges };
}

function Graph() {
  const group = useRef<THREE.Group>(null);
  const { positions, edges } = useMemo(buildGraph, []);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Node points buffer.
  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(positions.length * 3);
    positions.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [positions]);

  // Edge line segments buffer.
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      arr.set([positions[a].x, positions[a].y, positions[a].z], i * 6);
      arr.set([positions[b].x, positions[b].y, positions[b].z], i * 6 + 3);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [positions, edges]);

  // Signals: each travels along a chosen edge, looping.
  const signals = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        edge: edges[(i * 7 + 3) % edges.length],
        speed: 0.18 + (i % 4) * 0.06,
        offset: i / 8,
      })),
    [edges],
  );
  const signalRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // Gentle autonomous drift.
      group.current.rotation.y = Math.sin(t * 0.12) * 0.25;
      group.current.rotation.x = Math.cos(t * 0.1) * 0.12;
      // Mouse parallax (lerped, subtle).
      const k = Math.min(1, delta * 2);
      group.current.position.x +=
        (pointer.current.x * 0.6 - group.current.position.x) * k;
      group.current.position.y +=
        (pointer.current.y * 0.4 - group.current.position.y) * k;
    }

    signals.forEach((sig, i) => {
      const mesh = signalRefs.current[i];
      if (!mesh || !sig.edge) return;
      const [a, b] = sig.edge;
      const p = (t * sig.speed + sig.offset) % 1;
      mesh.position.lerpVectors(positions[a], positions[b], p);
      const scale = 0.04 + Math.sin(p * Math.PI) * 0.05;
      mesh.scale.setScalar(scale);
    });
  });

  // Track pointer in normalized space.
  useFrame(({ pointer: p }) => {
    pointer.current.x = p.x;
    pointer.current.y = p.y;
  });

  void viewport;

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          color={EDGE_COLOR}
          transparent
          opacity={0.16}
        />
      </lineSegments>

      <points geometry={nodeGeometry}>
        <pointsMaterial
          color={NODE_COLOR}
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {signals.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            signalRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.95} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <Graph />
    </Canvas>
  );
}
