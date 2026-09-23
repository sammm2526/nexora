"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ParticleFieldProps {
  count?: number;
  radiusMin?: number;
  radiusMax?: number;
  speed?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 420,
  radiusMin = 2.4,
  radiusMax = 5.2,
  speed = 1.0,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Deterministically compute spherical shell particle positions and opacities
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    // Deterministic palette: soft indigo, cyan, and muted periwinkle
    const palette = [
      new THREE.Color("#818cf8"), // Soft indigo
      new THREE.Color("#38bdf8"), // Soft sky cyan
      new THREE.Color("#c7d2fe"), // Pale periwinkle
      new THREE.Color("#6366f1"), // Deep indigo
    ];

    for (let i = 0; i < count; i++) {
      // Deterministic pseudorandom factor using fractional part
      const pseudoRand = ((i * 9301 + 49297) % 233280) / 233280;
      const pseudoRand2 = ((i * 12345 + 67891) % 233280) / 233280;

      const y = 1 - (i / (count - 1)) * 2; // Spherical distribution from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      // Deterministic radial spread
      const r = radiusMin + pseudoRand * (radiusMax - radiusMin);
      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      const py = y * r;

      pos[i * 3] = x;
      pos[i * 3 + 1] = py;
      pos[i * 3 + 2] = z;

      // Deterministic color assignment
      const colorIndex = Math.floor(pseudoRand2 * palette.length);
      const chosenColor = palette[colorIndex];

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count, radiusMin, radiusMax]);

  useFrame((state, delta) => {
    // Continuous subtle cosmic drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035 * speed;
      pointsRef.current.rotation.x += delta * 0.012 * speed;
    }

    // Subtle counter-parallax based on pointer to create multi-layer visual depth
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        -state.pointer.x * 0.25,
        2.5,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        -state.pointer.y * 0.2,
        2.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.026}
          vertexColors
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default ParticleField;
