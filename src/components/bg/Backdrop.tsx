"use client";

import { useEffect, useRef } from "react";
import { run } from "./gl";
import { GROUND_STRENGTH, dither } from "./shaders";

/**
 * The ground behind the site: the two-tone dither of waves at 35 % (Bruno, 24/11), chosen over
 * film dust, pixels, tunnel, flickering grid and ascii. The picker is gone (Bruno, 25/11).
 */
export function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const stop = run(canvas, { frag: dither, amt: () => GROUND_STRENGTH });
    return () => stop?.();
  }, []);

  return <canvas ref={ref} className="ground" aria-hidden="true" />;
}
