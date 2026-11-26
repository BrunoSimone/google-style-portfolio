/**
 * A tiny WebGL2 runner for full-viewport background shaders: one triangle, one fragment shader,
 * the site's own tones as uniforms (no new colour). Capped at 2× DPR and ~30 fps, pauses when the
 * tab is hidden, draws one still frame under reduced motion. Returns a cleanup function, or null
 * when WebGL2 is not available (the ink ground then shows on its own).
 */

// the palette from globals.css, as linear-ish 0..1 triples
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
export const TONES = {
  ink: hex("#0b0b0c"),
  film: hex("#141416"),
  rule: hex("#2a2b2e"),
  mid: hex("#8d8f93"),
  dim: hex("#9a9da3"),
  bone: hex("#ecebe7"),
};

export const HEADER = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 u_res;      // drawing buffer, px
uniform float u_dpr;
uniform float u_time;    // s
uniform vec2 u_ptr;      // pointer in buffer px, far away when absent
uniform float u_amt;     // strength 0..1
uniform vec3 u_ink, u_film, u_rule, u_mid, u_bone;
out vec4 o;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hash3(vec3 p) { return hash(p.xy + p.z * 17.17); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
// ink -> rule -> mid -> bone, the only ramp the site allows
vec3 ramp(float v) {
  v = clamp(v, 0.0, 1.0);
  return v < 0.35 ? mix(u_ink, u_rule, v / 0.35) : v < 0.75 ? mix(u_rule, u_mid, (v - 0.35) / 0.4) : mix(u_mid, u_bone, (v - 0.75) / 0.25);
}
// paint a 0..1 value over the ink ground, scaled by the strength
vec4 paint(float v) { return vec4(mix(u_ink, ramp(v), clamp(u_amt, 0.0, 1.0)), 1.0); }
vec2 rot(vec2 p, float a) { float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
`;

export const VERT = `#version 300 es
in vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

export type RunOptions = {
  frag: string;
  amt: () => number;
};

export function run(canvas: HTMLCanvasElement, opts: RunOptions): (() => void) | null {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s), src);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, HEADER + opts.frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = u("u_res"), uDpr = u("u_dpr"), uTime = u("u_time"), uPtr = u("u_ptr"), uAmt = u("u_amt");
  for (const [k, v] of Object.entries(TONES)) gl.uniform3fv(u(`u_${k}`), v);


  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let dpr = 1;
  const ptr = { x: -1e5, y: -1e5 };
  const size = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  // the loading screen starts this clock before hydration, so its ground and this one match
  const t0 = (window as { __bsT0?: number }).__bsT0 ?? performance.now();
  const draw = (now: number) => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uDpr, dpr);
    gl.uniform1f(uTime, reduce.matches ? 12 : (now - t0) / 1000);
    gl.uniform2f(uPtr, ptr.x * dpr, canvas.height - ptr.y * dpr);
    gl.uniform1f(uAmt, opts.amt());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let raf = 0;
  let last = 0;
  const step = (now: number) => {
    raf = requestAnimationFrame(step);
    if (now - last < 1000 / 30) return;
    last = now;
    draw(now);
  };
  const start = () => {
    cancelAnimationFrame(raf);
    if (reduce.matches) draw(performance.now());
    else raf = requestAnimationFrame(step);
  };
  const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());
  const onResize = () => {
    size();
    if (reduce.matches) draw(performance.now());
  };
  const onMove = (e: PointerEvent) => {
    ptr.x = e.clientX;
    ptr.y = e.clientY;
    if (reduce.matches) draw(performance.now());
  };
  const onLeave = () => {
    ptr.x = ptr.y = -1e5;
  };

  size();
  start();
  addEventListener("resize", onResize);
  addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVis);
  reduce.addEventListener("change", start);
  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("resize", onResize);
    removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("visibilitychange", onVis);
    reduce.removeEventListener("change", start);
    gl.deleteBuffer(buf);
    gl.deleteProgram(prog);
    // no loseContext(): the canvas is reused when the effect re-runs, and a lost context stays lost
  };
}
