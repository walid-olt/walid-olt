"use client";

import { ScreenQuad, shaderMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import fragmentShader from "./clouds.glsl";
import vertexShader from "./clouds.vert.glsl";
import { createCloudNoiseTextures } from "./noiseTextures";

type CloudMaterialUniforms = {
  uTime: number;
  uResolution: THREE.Vector2;
  uMouse: THREE.Vector2;
  uNoiseTexture: THREE.Texture | null;
  uDitherTexture: THREE.Texture | null;
};

const CloudMaterial = shaderMaterial<
  CloudMaterialUniforms,
  THREE.ShaderMaterial & CloudMaterialUniforms
>(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uNoiseTexture: null,
    uDitherTexture: null,
  },
  vertexShader,
  fragmentShader,
);

type CloudShaderProps = {
  interactive?: boolean;
};

function CloudShader({ interactive = false }: CloudShaderProps) {
  const { gl, pointer } = useThree();
  const resolution = useMemo(() => new THREE.Vector2(1, 1), []);
  const material = useMemo(() => {
    const textures = createCloudNoiseTextures();
    const cloudMaterial = new CloudMaterial();
    cloudMaterial.uNoiseTexture = textures.noise;
    cloudMaterial.uDitherTexture = textures.dither;
    cloudMaterial.depthWrite = false;
    cloudMaterial.depthTest = false;
    return cloudMaterial;
  }, []);

  useFrame((state) => {
    material.uTime = state.clock.elapsedTime;
    gl.getDrawingBufferSize(resolution);
    material.uResolution.copy(resolution);

    if (interactive) {
      material.uMouse.set(
        (pointer.x + 1) * 0.5 * resolution.x,
        (1 - pointer.y) * 0.5 * resolution.y,
      );
      return;
    }

    const orbit = 0.5 + 0.15 * Math.sin(state.clock.elapsedTime * 0.15);
    material.uMouse.set(orbit * resolution.x, 0.5 * resolution.y);
  });

  return <ScreenQuad material={material} frustumCulled={false} />;
}

type CloudsProps = {
  className?: string;
  interactive?: boolean;
  dpr?: number | [number, number];
};

export function Clouds({
  className,
  interactive = true,
  dpr = [1, 3],
}: CloudsProps) {
  return (
    <div className={className}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], near: 0, far: 2, zoom: 1 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <CloudShader interactive={interactive} />
      </Canvas>
    </div>
  );
}

export default Clouds;
