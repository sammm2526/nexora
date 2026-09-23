"use client";

import React, { useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";

export interface HeroSceneCanvasProps {
  className?: string;
  scale?: number;
  particleCount?: number;
}

const emptySubscribe = () => () => {};

export const HeroSceneCanvas: React.FC<HeroSceneCanvasProps> = ({
  className = "",
  scale = 1,
  particleCount = 400,
}) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-zinc-950/40 border border-zinc-800/60 backdrop-blur-md animate-pulse ${className}`}
        style={{ minHeight: "380px" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          <span className="text-xs font-medium tracking-wide text-zinc-400">
            Initializing Neural Core...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
      role="img"
      aria-label="Interactive 3D Neural Core visualization with ambient particle field"
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <HeroScene scale={scale} particleCount={particleCount} />
      </Canvas>
    </div>
  );
};

export default HeroSceneCanvas;
