//@ts-nocheck

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function GPUMorphMesh() {
  const meshRef = useRef();
  const geoRef = useRef();

  useEffect(() => {
    const geometry = geoRef.current;
    const positions = geometry.attributes.position.array;
    const count = geometry.attributes.position.count;

    // Create arrays to hold our 2 target shapes (Shape B and Shape C)
    const target1 = new Float32Array(count * 3); // Shape B: Wave
    const target2 = new Float32Array(count * 3); // Shape C: Sphere/Hump

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      // Target 1: A sine wave along the Z axis
      target1[i * 3] = x;
      target1[i * 3 + 1] = y;
      target1[i * 3 + 2] = Math.sin(x * 2) * 0.5;

      // Target 2: A localized spherical spike in the center
      const distFromCenter = Math.sqrt(x * x + y * y);
      target2[i * 3] = x;
      target2[i * 3 + 1] = y;
      target2[i * 3 + 2] = Math.max(0, 1 - distFromCenter);
    }

    // Assign targets to the geometry
    geometry.morphAttributes.position = [];
    geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
      target1,
      3,
    );
    geometry.morphAttributes.position[1] = new THREE.Float32BufferAttribute(
      target2,
      3,
    );

    // Signal update
    meshRef.current.updateMorphTargets();
  }, []);

  // Animate the morphing weights smoothly over time
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    // Ping-pong weights between 0 and 1
    meshRef.current.morphTargetInfluences[0] = Math.abs(Math.sin(time));
    meshRef.current.morphTargetInfluences[1] = Math.abs(Math.cos(time));
  });

  return (
    <mesh ref={meshRef}>
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
      />{" "}
      <planeGeometry ref={geoRef} args={[2, 2, 32, 32]} />
    </mesh>
  );
}
