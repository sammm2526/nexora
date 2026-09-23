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
      {/* Soft ambient light for base shadow depth */}
      <ambientLight intensity={0.35 * intensity} />

      {/* Primary directional key light from upper right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4 * intensity}
        color="#f8fafc"
      />

      {/* Cool cyan/indigo accent fill from lower left */}
      <directionalLight
        position={[-6, -3, 4]}
        intensity={0.8 * intensity}
        color="#38bdf8"
      />

      {/* Soft violet rim backlight for edge definition on dark canvas */}
      <directionalLight
        position={[0, 6, -6]}
        intensity={1.1 * intensity}
        color="#818cf8"
      />

      {/* Low-intensity bottom bounce light for subtle metallic underglow */}
      <directionalLight
        position={[0, -5, 2]}
        intensity={0.4 * intensity}
        color="#4f46e5"
      />

      {/* Hemisphere light with deep dark ground for rich contrast */}
      <hemisphereLight
        args={["#c7d2fe", "#09090b", 0.35 * intensity]}
      />
    </>
  );
};

export default StudioLighting;
