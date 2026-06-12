"use client";

import { ScreenQuad, shaderMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import fragmentShader from "./collaps.glsl";
import vertexShader from "./collaps.vert.glsl";

type CollapseMaterialUniforms = {
  uTime: number;
  uResolution: THREE.Vector2;
};

const CollapseMaterial = shaderMaterial<
  CollapseMaterialUniforms,
  THREE.ShaderMaterial & CollapseMaterialUniforms
>(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  vertexShader,
  fragmentShader,
);

function CollapseShader() {
  const { gl } = useThree();
  const resolution = useMemo(() => new THREE.Vector2(1, 1), []);
  const material = useMemo(() => {
    const collapseMaterial = new CollapseMaterial();
    collapseMaterial.depthWrite = false;
    collapseMaterial.depthTest = false;
    collapseMaterial.transparent = true;
    return collapseMaterial;
  }, []);

  useFrame((state) => {
    material.uTime = state.clock.elapsedTime;
    gl.getDrawingBufferSize(resolution);
    material.uResolution.copy(resolution);
  });

  return <ScreenQuad material={material} frustumCulled={false} />;
}

export function Collapse() {
  return <CollapseShader />;
}

export default Collapse;
