/**
 * The site's ground (Bruno, 24/11): written from scratch after the shadcn.io «Dither» page (its
 * source is behind a paid plan, so this follows the described look, not the code). It paints
 * with the site's tones only (ink, mid, bone). The loading screen draws the same ground on the
 * same clock (src/components/Loader.tsx), so lifting it never shows a seam.
 */

/** the strength the ground ships at (Bruno, 24/11) */
export const GROUND_STRENGTH = 0.35;

/** Dither: banded waves ordered-dithered (Bayer 8×8, 3 px cells) in two tones, the middle kept clear */
export const ditherGround = /* glsl */ `
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }
vec3 ground(vec2 frag, float amt) {
  float px = 3.0 * u_dpr;                                    // pixel 3
  vec2 cell = floor(frag / px);
  vec2 c = cell * px / u_res.y;
  vec2 q = rot(c - vec2(0.5 * u_res.x / u_res.y, 0.5), radians(-18.0)); // angle -18
  float t = u_time * 0.22;
  float wave = sin(q.x * 2.1 + t + fbm(q * 1.1 + t * 0.2) * 3.0) * 0.4;
  float f = 0.5 + 0.5 * sin((q.y * 3.0 + wave) * 6.2831);
  f = pow(f, 1.4) * (0.55 + 0.6 * fbm(q * 2.0 - t * 0.3));
  vec2 s = frag / u_res - 0.5;
  f *= mix(1.0, smoothstep(0.06, 0.42, length(s * vec2(1.1, 1.7))), 0.85); // clearing 0.85
  float th = bayer8(cell);
  float body = step(th, f * 0.95);                          // density
  float crest = step(th, (f - 0.58) * 2.4);
  vec3 col = mix(u_ink, u_mid, body * 0.6);
  col = mix(col, u_bone, crest);
  // two-tone and loud by nature: strength bites harder here, so 60% stays behind the text
  float k = clamp(amt, 0.0, 1.0);
  return mix(u_ink, col, k * k);
}`;

export const dither = /* glsl */ `${ditherGround}
void main() { o = vec4(ground(gl_FragCoord.xy, u_amt), 1.0); }`;
