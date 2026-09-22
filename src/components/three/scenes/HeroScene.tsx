"use client";

import React from "react";
import { Float } from "@react-three/drei";
import { StudioLighting } from "../lighting/StudioLighting";
import { ResponsiveCamera } from "../camera/ResponsiveCamera";
import { NeuralCore } from "../objects/NeuralCore";

export interface HeroSceneProps {
  scale?: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ scale = 1 }) => {
  return (
    <>
      {/* Dynamic pointer-responsive camera controller */}
      <ResponsiveCamera pointerSensitivity={0.45} baseZ={4.8} />

      {/* Balanced studio lighting */}
      <StudioLighting intensity={1} />

      {/* Gentle floating physics */}
      <Float
        speed={1.6}
        rotationIntensity={0.15}
        floatIntensity={0.4}
        floatingRange={[-0.1, 0.1]}
      >
        <NeuralCore scale={scale} />
      </Float>
    </>
  );
};
