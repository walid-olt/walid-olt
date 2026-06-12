import * as THREE from "three";

const NOISE_SIZE = 256;

function fillRandomNoise(data: Uint8Array, size: number) {
  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;
    data[stride] = Math.floor(Math.random() * 256);
    data[stride + 1] = Math.floor(Math.random() * 256);
    data[stride + 2] = 0;
    data[stride + 3] = 255;
  }
}

function createDataTexture(data: Uint8Array, size: number) {
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function createCloudNoiseTextures() {
  const noiseData = new Uint8Array(NOISE_SIZE * NOISE_SIZE * 4);
  const ditherData = new Uint8Array(NOISE_SIZE * NOISE_SIZE * 4);

  fillRandomNoise(noiseData, NOISE_SIZE);
  fillRandomNoise(ditherData, NOISE_SIZE);

  return {
    noise: createDataTexture(noiseData, NOISE_SIZE),
    dither: createDataTexture(ditherData, NOISE_SIZE),
  };
}
