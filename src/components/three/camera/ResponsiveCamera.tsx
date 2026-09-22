"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface ResponsiveCameraProps {
  pointerSensitivity?: number;
  baseZ?: number;
}

export const ResponsiveCamera: React.FC<ResponsiveCameraProps> = ({
  pointerSensitivity = 0.5,
  baseZ = 4.8,
}) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, baseZ));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Subtle pointer parallax: smooth lerp to target position based on pointer
    const targetX = state.pointer.x * pointerSensitivity;
    const targetY = state.pointer.y * pointerSensitivity * 0.6;

    targetPos.current.set(targetX, targetY, baseZ);

    // Smooth damping (frame-rate independent lerp factor)
    const factor = 1 - Math.exp(-4 * delta);
    camera.position.lerp(targetPos.current, factor);
    camera.lookAt(lookTarget.current);
  });

  return null;
};
