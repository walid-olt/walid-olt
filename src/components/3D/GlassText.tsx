"use client";

import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Mesh } from "three";

type Props = {
  text: string;
};

function GlassTextMesh({ text }: Props) {
  const ref = useRef<Mesh | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.position.z += 2;
    }
  }, []);
  return (
    <Text3D
      font="/source_sans_3.json"
      size={0.8}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelSegments={5}
      ref={ref}
    >
      {text}
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
    </Text3D>
  );
}

export default function GlassText({ text }: Props) {
  return (
    <Suspense fallback={null}>
      <Center>
        <GlassTextMesh text={text} />
      </Center>
    </Suspense>
  );
}
