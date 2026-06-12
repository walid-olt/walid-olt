"use client";

import { AdaptiveDpr, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import GlassBox from "./GlassBox";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={2.4} color={"white"} />
      <directionalLight position={[4, 4, 4]} intensity={1} />
      <Environment preset="warehouse" />
      <GlassBox />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
