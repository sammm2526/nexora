# Nexora WebXR / AR / VR Architecture (Reserved)

This directory is reserved for future WebXR, AR, and VR functionality for the Nexora frontend.

## Roadmap & Principles

1. **Progressive Enhancement**:
   - The desktop/mobile 2D & 3D experience works out-of-the-box without requiring WebXR-capable hardware or browser flags.
   - When XR devices (Apple Vision Pro, Meta Quest, mobile WebXR viewers) are detected in future phases, the application will provide optional immersive entrypoints.

2. **Decoupled Structure**:
   - `components/ui/`: Standard 2D UI for web usability.
   - `components/three/`: Procedural 3D scenes and objects.
   - `components/xr/`: Spatial controllers, session managers, AR reticles, and VR interaction rigs.

3. **Status**:
   - Initial 3D foundation milestone: Interfaces and types defined; no runtime XR sessions instantiated.
