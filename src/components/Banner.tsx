"use client";
import Scene from "./3D/Scene";

const Banner = () => {
  return (
    <div className="sticky top-0 z-10 h-48 w-full shrink-0 overflow-hidden shadow-[0px_1px_0_var(--muted)]">
      <Scene />
    </div>
  );
};

export default Banner;
