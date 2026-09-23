"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ResponsiveCameraProps {
  pointerSensitivity?: number;
  baseZ?: number;
  lookAtTarget?: [number, number, number];
}

export const ResponsiveCamera: React.FC<ResponsiveCameraProps> = ({
  pointerSensitivity = 0.35,
  baseZ = 4.8,
  lookAtTarget = [0, 0, 0],
}) => {
  const lookTarget = useRef(new THREE.Vector3(...lookAtTarget));

  useFrame((state, delta) => {
    // Subtle pointer parallax via gentle lookAt target adjustment
    // This allows OrbitControls 360-degree drag interaction to work seamlessly without fighting
    const targetX = -state.pointer.x * pointerSensitivity * 0.3;
    const targetY = -state.pointer.y * pointerSensitivity * 0.25;

    lookTarget.current.x = THREE.MathUtils.damp(
      lookTarget.current.x,
      targetX,
      3.5,
      delta
    );
    lookTarget.current.y = THREE.MathUtils.damp(
      lookTarget.current.y,
      targetY,
      3.5,
      delta
    );

    // Subtly adjust camera position Z towards baseZ
    const targetPos = new THREE.Vector3(
      state.camera.position.x,
      state.camera.position.y,
      baseZ
    );
    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(lookTarget.current);
  });

  return null;
};

export default ResponsiveCamera;
