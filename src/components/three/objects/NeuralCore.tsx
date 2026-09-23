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
  const ring3Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const innerLightRef = useRef<THREE.PointLight>(null);

  const [hovered, setHovered] = useState(false);

  // Generate procedural node positions on an orbital Fibonacci sphere
  const [nodePositions, nodeOriginalPositions, nodeYValues] = useMemo(() => {
    const count = 96;
    const positions = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);
    const yValues = new Float32Array(count);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(Math.max(0, 1 - y * y)); // radius at y
      const theta = phi * i;

      const r = 1.48 + (i % 4) * 0.12; // Varying orbital shell radii
      const x = Math.cos(theta) * radius * r;
      const z = Math.sin(theta) * radius * r;
      const py = y * r;

      positions[i * 3] = x;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = z;

      original[i * 3] = x;
      original[i * 3 + 1] = py;
      original[i * 3 + 2] = z;

      yValues[i] = y;
    }

    return [positions, original, yValues];
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.35 : 1.0;

    // Smooth overall group rotation & responsive tilt with pointer
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22 * speedMultiplier;
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.28,
        3.5,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        state.pointer.x * 0.22,
        3.5,
        delta
      );
    }

    // Faceted core pulsation (dual harmonic for computational "breath") and counter-rotation
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.35 * speedMultiplier;
      coreRef.current.rotation.x += delta * 0.18;

      const primaryPulse = Math.sin(elapsed * 1.8) * 0.035;
      const secondaryPulse = Math.cos(elapsed * 3.6) * 0.012;
      const pulseScale = 1 + primaryPulse + secondaryPulse;
      coreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    // Outer wireframe lattice shell
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.14;
      shellRef.current.rotation.z -= delta * 0.08;
      const shellPulse = 1 + Math.sin(elapsed * 1.4 + 1.0) * 0.02;
      shellRef.current.scale.set(shellPulse, shellPulse, shellPulse);
    }

    // Inner synaptic ring with dynamic precession
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.32 * speedMultiplier;
      ring1Ref.current.rotation.x = Math.PI / 4 + Math.sin(elapsed * 0.8) * 0.08;
    }

    // Outer synaptic ring with counter precession
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.28 * speedMultiplier;
      ring2Ref.current.rotation.z = -Math.PI / 3 + Math.cos(elapsed * 0.7) * 0.08;
    }

    // Equatorial orbital data ring
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.18;
      ring3Ref.current.rotation.y += delta * 0.22 * speedMultiplier;
    }

    // Dynamic synaptic wave passing through neural node points
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const nodeCount = nodePositions.length / 3;

      for (let i = 0; i < nodeCount; i++) {
        const y = nodeYValues[i];
        // Wave propagates vertically through the neural cluster
        const wave = Math.sin(elapsed * 2.4 + y * 3.5) * 0.045;
        const breath = 1 + wave;

        posAttr.setXYZ(
          i,
          nodeOriginalPositions[i * 3] * breath,
          nodeOriginalPositions[i * 3 + 1] * breath,
          nodeOriginalPositions[i * 3 + 2] * breath
        );
      }
      posAttr.needsUpdate = true;
    }

    // Pulsing inner energy glow
    if (innerLightRef.current) {
      const baseIntensity = hovered ? 2.5 : 1.6;
      innerLightRef.current.intensity =
        baseIntensity + Math.sin(elapsed * 2.2) * 0.4;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Internal computational luminescence */}
      <pointLight
        ref={innerLightRef}
        color={hovered ? "#818cf8" : "#6366f1"}
        distance={4.5}
        decay={2}
      />

      {/* Central Faceted Core (Icosahedron) */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshStandardMaterial
          color={hovered ? "#6366f1" : "#4338ca"}
          emissive={hovered ? "#4338ca" : "#312e81"}
          emissiveIntensity={hovered ? 0.45 : 0.2}
          roughness={0.22}
          metalness={0.82}
          wireframe={false}
          flatShading
        />
      </mesh>

      {/* Geodesic Wireframe Lattice Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.38, 1]} />
        <meshStandardMaterial
          color="#818cf8"
          roughness={0.35}
          metalness={0.65}
          wireframe
          transparent
          opacity={hovered ? 0.45 : 0.32}
        />
      </mesh>

      {/* Primary Synaptic Orbital Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.68, 0.013, 16, 96]} />
        <meshStandardMaterial
          color="#a5b4fc"
          emissive="#4f46e5"
          emissiveIntensity={0.25}
          roughness={0.18}
          metalness={0.85}
        />
      </mesh>

      {/* Secondary Synaptic Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.92, 0.011, 16, 96]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.25}
          roughness={0.18}
          metalness={0.85}
        />
      </mesh>

      {/* Tertiary Equatorial Synaptic Ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.14, 0.009, 16, 96]} />
        <meshStandardMaterial
          color="#c7d2fe"
          emissive="#6366f1"
          emissiveIntensity={0.18}
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.7}
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
          size={0.038}
          color={hovered ? "#e0e7ff" : "#c7d2fe"}
          transparent
          opacity={hovered ? 0.95 : 0.82}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default NeuralCore;
