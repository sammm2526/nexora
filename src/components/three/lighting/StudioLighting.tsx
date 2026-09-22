"use client";

import React from "react";

export interface StudioLightingProps {
  intensity?: number;
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  intensity = 1,
}) => {
  return (
    <>
      {/* Subtle ambient light for base visibility */}
      <ambientLight intensity={0.4 * intensity} />

      {/* Main key directional light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2 * intensity}
        color="#ffffff"
      />

      {/* Cool cyan/indigo fill light from the left */}
      <directionalLight
        position={[-6, -2, 4]}
        intensity={0.8 * intensity}
        color="#6366f1"
      />

      {/* Soft violet rim light from behind for silhouette definition */}
      <directionalLight
        position={[0, 5, -6]}
        intensity={1.0 * intensity}
        color="#8b5cf6"
      />

      {/* Subtle hemisphere light for soft natural contrast */}
      <hemisphereLight
        args={["#ffffff", "#09090b", 0.3 * intensity]}
      />
    </>
  );
};
