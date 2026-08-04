"use client";

import dynamic from "next/dynamic";

const FaultyTerminal = dynamic(() => import("./FaultyTerminal"), { ssr: false });

export function Background() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <FaultyTerminal
        scale={1.9}
        timeScale={1.3}
        tint="#9b5de5"
        mouseStrength={0.6}
        curvature={0.3}
        scanlineIntensity={0}
        brightness={0.9}
        gridMul={[2, 1]}
        digitSize={1.5}
        flickerAmount={1}
        glitchAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        pageLoadAnimation
        mouseReact
        className="h-full w-full"
      />
      {/* readability scrim — noir pur, pixels violets en texture ambiante */}
      <div className="pointer-events-none absolute inset-0 bg-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </div>
  );
}
