"use client";

import React from "react";
import { Float, OrbitControls } from "@react-three/drei";
import { StudioLighting } from "../lighting/StudioLighting";
import { ResponsiveCamera } from "../camera/ResponsiveCamera";
import { NeuralCore } from "../objects/NeuralCore";
import { ParticleField } from "../objects/ParticleField";

export interface HeroSceneProps {
  scale?: number;
  particleCount?: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  scale = 1,
  particleCount = 420,
}) => {
  return (
    <>
      {/* Dynamic pointer-responsive camera controller */}
      <ResponsiveCamera pointerSensitivity={0.35} baseZ={4.8} />

      {/* 360-degree drag-to-inspect interaction with smooth damping */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.75}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />

      {/* Calibrated dark-luxury studio lighting */}
      <StudioLighting intensity={1} />

      {/* Ambient procedural particle field around the core */}
      <ParticleField count={particleCount} radiusMin={2.2} radiusMax={5.2} />

      {/* Subtle computational floating physics for the Neural Core */}
      <Float
        speed={1.4}
        rotationIntensity={0.12}
        floatIntensity={0.35}
        floatingRange={[-0.08, 0.08]}
      >
        <NeuralCore scale={scale} />
      </Float>
    </>
  );
};

export default HeroScene;
