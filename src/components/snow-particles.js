"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import { loadSnowPreset } from "tsparticles-preset-snow";

export default function SnowParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSnowPreset(engine);
  }, []);

  return (
    <Particles
      id="snowParticles"
      init={particlesInit}
      options={{
        preset: "snow",
        background: { color: "transparent" },
        fullScreen: { enable: true, zIndex: 10 },
      }}
    />
  );
}
