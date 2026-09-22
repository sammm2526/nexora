/**
 * Reserved WebXR/AR/VR Architecture Types for Nexora.
 * Note: These are forward-compatible interface stubs for future WebXR implementation.
 * No hardware or native WebXR sessions are initialized at this milestone.
 */

export type XRSessionMode = "inline" | "immersive-vr" | "immersive-ar";

export type XRReferenceSpaceType =
  | "viewer"
  | "local"
  | "local-floor"
  | "bounded-floor"
  | "unbounded";

export interface XRCapabilityState {
  isSupported: boolean;
  activeSessionMode: XRSessionMode | null;
  hasArSupport: boolean;
  hasVrSupport: boolean;
}

export interface XRInteractionEvent {
  sourceType: "pointer" | "hand" | "controller";
  position: [number, number, number];
  rotation: [number, number, number, number];
}
