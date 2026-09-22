"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface NeuralCoreProps {
  scale?: number;
}

export const NeuralCore: React.FC<NeuralCoreProps> = ({ scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const [hovered, setHovered] = useState(false);

  // Generate procedural node positions on an orbital Fibonacci sphere
  const [nodePositions, nodeOriginalPositions] = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      const r = 1.5 + (i % 3) * 0.15; // Varying orbital shell radii
      const x = Math.cos(theta) * radius * r;
      const z = Math.sin(theta) * radius * r;
      const py = y * r;

      positions[i * 3] = x;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = z;

      original[i * 3] = x;
      original[i * 3 + 1] = py;
      original[i * 3 + 2] = z;
    }

    return [positions, original];
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const targetSpeed = hovered ? 1.4 : 1.0;

    // Smooth overall group rotation & responsive tilt with pointer
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25 * targetSpeed;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.3,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        state.pointer.x * 0.2,
        0.05
      );
    }

    // Faceted core pulsation and counter-rotation
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.4 * targetSpeed;
      coreRef.current.rotation.x += delta * 0.2;
      const pulse = 1 + Math.sin(elapsed * 2) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Outer wireframe shell
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.15;
      shellRef.current.rotation.z -= delta * 0.1;
    }

    // Concentric synaptic rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35 * targetSpeed;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.3 * targetSpeed;
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    // Subtle breathing animation of neural nodes
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const breath = 1 + Math.sin(elapsed * 1.6) * 0.05;
      for (let i = 0; i < nodePositions.length / 3; i++) {
        posAttr.setXYZ(
          i,
          nodeOriginalPositions[i * 3] * breath,
          nodeOriginalPositions[i * 3 + 1] * breath,
          nodeOriginalPositions[i * 3 + 2] * breath
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central Faceted Core (Icosahedron) */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={hovered ? "#6366f1" : "#4f46e5"}
          roughness={0.25}
          metalness={0.75}
          wireframe={false}
          flatShading
        />
      </mesh>

      {/* Geodesic Wireframe Lattice Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#818cf8"
          roughness={0.4}
          metalness={0.6}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner Synaptic Orbital Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.65, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#a5b4fc"
          emissive="#4338ca"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Synaptic Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.9, 0.01, 16, 80]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Procedural Neural Node Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#c7d2fe"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
