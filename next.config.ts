import type { NextConfig } from "next";
import path from "node:path";

const glslRule = {
  test: /\.glsl$/,
  use: path.resolve("loaders/glsl-loader.js"),
};

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack: (config) => {
    config.module.rules.push(glslRule);
    return config;
  },
  turbopack: {
    rules: {
      "*.glsl": {
        loaders: [path.resolve("loaders/glsl-loader.js")],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
