import {
  MeshTransmissionMaterial,
  Octahedron,
  PresentationControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Mesh } from "three";

export default function GlassBox() {
  const ref = useRef<Mesh | null>(null);
  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotateY(delta);
  });
  useEffect(() => {
    if (!ref.current) return;
    ref.current.position.z += 1;
  }, []);
  return (
    <PresentationControls
      enabled={true} // the controls can be disabled by setting this to false
      global={false} // Spin globally or by dragging the model
      cursor={true} // Whether to toggle cursor style on drag
      snap={true} // Snap-back to center (can also be a spring config)
      speed={1} // Speed factor
      zoom={1} // Zoom factor when half the polar-max is reached
      rotation={[0, 0, 0]} // Default rotation
      polar={[0, Math.PI / 2]} // Vertical limits
      azimuth={[-Infinity, Infinity]} // Horizontal limits
    >
      <Octahedron args={[1]} ref={ref}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.2}
          thickness={1}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Octahedron>
    </PresentationControls>
  );
}
