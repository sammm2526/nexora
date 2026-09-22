"use client";

import React, { useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";

export interface HeroSceneCanvasProps {
  className?: string;
}

const emptySubscribe = () => () => {};

export const HeroSceneCanvas: React.FC<HeroSceneCanvasProps> = ({
  className = "",
}) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm animate-pulse ${className}`}
        style={{ minHeight: "360px" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            Initializing 3D Neural Engine...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D Neural Core visualization"
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
};

export default HeroSceneCanvas;
