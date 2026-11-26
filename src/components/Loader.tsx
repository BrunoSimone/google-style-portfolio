import type { CSSProperties } from "react";
import { wordmarkBox } from "@/brand/Logotype";
import { marks } from "@/brand/marks";
import { HEADER, TONES, VERT } from "./bg/gl";
import { GROUND_STRENGTH, dither } from "./bg/shaders";

/**
 * Loading screen (Bruno, 23/11): the animated logo over everything on every full page load or
 * reload, never skippable. It stays until the animation has played through once (the whole
 * animation, always) and the page has loaded (window `load`), whichever is later. Client-side
 * navigation keeps the layout, so it never shows between routes.
 *
 * The animation (Bruno, 25/11, after «Factory — Logo loader» on thepromptsfactory.com): over the
 * site's own ground, a fine bone line traces the outline of every letter, the left ones a touch
 * earlier, as if a hand crossed the name; then the name fills solid as the line fades. The logo is plain SVG and
 * CSS (no JS, no WebGL): it runs before hydration and wherever the page renders.
 *
 * The ground is drawn by an inline script on one WebGL canvas, the same shader as the site's.
 * It starts the ground's clock (window.__bsT0) and the site's ground (Backdrop) reads it, so when
 * the screen lifts the two grounds are the same frame: only the name fades away. Without WebGL2
 * the screen is flat ink.
 *
 * The way out (Bruno, 25/11, like the change between two title cards): the ground never changes
 * (the screen's ground and the page's are the same frame), the name fades out on its own, the
 * screen goes, and then the page enters: the hero's lines rise from a mask one after another,
 * the bar drops in, the scroll cue last (html[data-entering], only on this first entrance).
 *
 * The element stays in the tree (removing it would break hydration); the script only sets
 * html[data-loaded]. Under reduced motion the name shows whole and still, for the same time,
 * and the screen fades with no entrance. Safety nets: MAX_MS, the same lift in CSS at 8 s, <noscript>.
 */
const STAGGER_MS = 300; // the rightmost letter starts this much after the first
const DRAW_MS = 800; // each outline
const FILL_AT_MS = 1000;
const FILL_MS = 450;
const ANIM_MS = FILL_AT_MS + FILL_MS;
const HOLD_MS = 300; // the settled name, a beat before it lifts
const OUT_MS = 280; // the logo going, keep in step with .loader in globals.css
const ENTER_MS = 1700; // the page's entrance, then html[data-entering] goes (globals.css)
const MAX_MS = 8000;

const mark = marks.wordmark;
const box = wordmarkBox(mark);
/** each closed contour of the name, with where it starts across the name (0 left, 1 right) */
const contours = (mark.d.match(/M[^M]*/g) ?? []).map((d) => ({
  d,
  at: (Number(d.slice(1).split(/[ ,]/)[0]) - box.x) / box.w,
}));

const script = `(function(){
var d=document.documentElement,c=document.getElementById("loader-gl");
window.__bsT0=window.__bsT0||performance.now();
var min=performance.now()+${ANIM_MS + HOLD_MS};
function go(){if(d.dataset.loaded)return;d.dataset.loaded="1";if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.entering="1";setTimeout(function(){delete d.dataset.entering},${ENTER_MS})}}
function ready(){setTimeout(go,Math.max(0,min-performance.now()))}
if(document.readyState==="complete")ready();else addEventListener("load",ready,{once:true});
setTimeout(go,${MAX_MS});
var gl=c&&c.getContext("webgl2",{antialias:false,alpha:false});
if(!gl)return;
function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
var p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,${JSON.stringify(VERT)}));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,${JSON.stringify(HEADER + dither)}));gl.linkProgram(p);
if(!gl.getProgramParameter(p,gl.LINK_STATUS))return;
gl.useProgram(p);
var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
var a=gl.getAttribLocation(p,"a");gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
function U(n){return gl.getUniformLocation(p,n)}
var T=${JSON.stringify(TONES)};for(var k in T)gl.uniform3fv(U("u_"+k),T[k]);
gl.uniform1f(U("u_amt"),${GROUND_STRENGTH});gl.uniform2f(U("u_ptr"),-1e5,-1e5);
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,dpr=1,lifted=0;
function size(){dpr=Math.min(2,devicePixelRatio||1);c.width=Math.round(innerWidth*dpr);c.height=Math.round(innerHeight*dpr);gl.viewport(0,0,c.width,c.height)}
function step(now){
if(d.dataset.loaded){if(!lifted)lifted=now;else if(now-lifted>${OUT_MS + 100}){gl.deleteBuffer(b);gl.deleteProgram(p);return}}
requestAnimationFrame(step);
gl.uniform2f(U("u_res"),c.width,c.height);gl.uniform1f(U("u_dpr"),dpr);
gl.uniform1f(U("u_time"),reduce?12:(now-window.__bsT0)/1000);
gl.drawArrays(gl.TRIANGLES,0,3)}
size();addEventListener("resize",size);requestAnimationFrame(step);
})();`;

export function Loader() {
  return (
    <>
      <div className="loader" aria-hidden="true">
        <canvas id="loader-gl" className="loader-gl" suppressHydrationWarning />
        <svg
          viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
          className="loader-mark"
          focusable="false"
          style={{ "--draw": `${DRAW_MS}ms`, "--fill-at": `${FILL_AT_MS}ms`, "--fill": `${FILL_MS}ms` } as CSSProperties}
        >
          {/* the font's contours overlap inside some letters (N, M, S): the lines are drawn twice
              as thick and only their outer half shows, outside the filled name, so only the
              outline of the whole letter is traced */}
          <defs>
            <mask id="loader-out" maskUnits="userSpaceOnUse" x={box.x - box.h} y={box.y - box.h} width={box.w + box.h * 2} height={box.h * 3}>
              <rect x={box.x - box.h} y={box.y - box.h} width={box.w + box.h * 2} height={box.h * 3} fill="#fff" />
              <path d={mark.d} fill="#000" />
            </mask>
          </defs>
          <path className="loader-fill" d={mark.d} />
          <g mask="url(#loader-out)">
            {contours.map((c, i) => (
              <path key={i} className="loader-line" d={c.d} pathLength={1} style={{ "--d": `${Math.round(c.at * STAGGER_MS)}ms` } as CSSProperties} />
            ))}
          </g>
        </svg>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <style>{`.loader{display:none}`}</style>
      </noscript>
    </>
  );
}
