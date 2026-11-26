// Renders the share image (og:image / twitter:image), 1200×630, with the site's own fonts, the
// logotype's outline and, for variant B, the site's dither ground and the reel's frames.
//   A · Logo: the logotype in its final state (after the loading screen) centred on ink, with
//       «Video editor» small under it in Martian Mono.
//   B · Site: the front page in one frame: the bar's mark, the hero's two lines and the reel strip
//       with its lit frame (the neighbours switched off, as on the site).
// Bruno chose A (26/11): it ships as src/app/opengraph-image.png and twitter-image.png.
// Uses the installed Google Chrome (headless, WebGL through SwiftShader); no packages.
//
//   node scripts/brand/render-og.mjs a src/app/opengraph-image.png && cp src/app/opengraph-image.png src/app/twitter-image.png
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const [VARIANT, OUT] = [process.argv[2], process.argv[3]];
if (!["a", "b"].includes(VARIANT) || !OUT) throw new Error("usage: render-og.mjs <a|b> <out.png>");
const W = 1200, H = 630;

const { HEADER, TONES } = await import(join(ROOT, "src/components/bg/gl.ts"));
const { dither, GROUND_STRENGTH } = await import(join(ROOT, "src/components/bg/shaders.ts"));
const { marks } = await import(join(ROOT, "src/brand/marks.ts"));
const { hookCuts } = await import(join(ROOT, "src/content/work.ts"));

const b64 = (p) => readFileSync(join(ROOT, p)).toString("base64");
const font = (name, file, weight) =>
  `@font-face{font-family:${name};src:url(data:font/woff2;base64,${b64(file)}) format("woff2");font-weight:${weight};}`;
const svgMark = (m, h) => {
  const ink = m.width - 2 * m.inkLeft;
  return `<svg height="${h}" viewBox="${m.inkLeft} 0 ${ink} ${m.cap}" style="display:block"><path d="${m.d}" fill="#ecebe7"/></svg>`;
};
const tri = `<svg width="5" height="6" viewBox="0 0 5 6"><path d="M0 0L5 3L0 6Z" fill="currentColor"/></svg>`;
const edge = (parts) => parts.map((p, i) => (i ? tri : "") + `<span>${p}</span>`).join("");

const perfT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='42'%3E%3Crect x='7' y='5' width='9' height='12' rx='1.5' fill='%230b0b0c'/%3E%3C/svg%3E")`;
const perfB = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='42'%3E%3Crect x='7' y='25' width='9' height='12' rx='1.5' fill='%230b0b0c'/%3E%3C/svg%3E")`;

const css = `
${font("Mona", "src/fonts/MonaSans-var.woff2", "400 800")}
${font("Martian", "src/fonts/MartianMono-var.woff2", "400 600")}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;background:#0b0b0c;color:#ecebe7;overflow:hidden;-webkit-font-smoothing:antialiased}
#ground{position:absolute;inset:0;width:${W}px;height:${H}px}
.mono{font-family:Martian;font-variation-settings:"wdth" 87;text-transform:uppercase;letter-spacing:.12em;font-variant-numeric:tabular-nums slashed-zero;line-height:1}
.cond{font-family:Mona;font-variation-settings:"wdth" 75;font-weight:800;letter-spacing:-.01em}
.edge{display:flex;align-items:center;gap:.6em;white-space:nowrap;font-variation-settings:"wdth" 75;letter-spacing:.08em}
.band{position:absolute;left:0;background-color:#141416;background-image:${perfT},${perfB};background-repeat:repeat-x;background-position:0 0,0 100%}
`;

const pageA = `
<div style="position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:34px">
  ${svgMark(marks.wordmark, 104)}
  <p class="mono" style="font-size:20px;color:#9a9da3">Video editor</p>
</div>`;

// B: the strip's geometry, as the site lays it flat (lit gate in the middle)
const EDGE = 34, GAP = 6, FH = 250, FW = Math.round((FH * 9) / 16);
const bandTop = H - (FH + 2 * EDGE) - 34;
const gateLeft = Math.round((W - FW) / 2);
const LIT = 3;
// the strip runs past both edges of the image, as on the site: the cuts repeat
const N = hookCuts.length;
const frames = Array.from({ length: N + 4 }, (_, k) => k - 2)
  .map((i) => {
    const c = hookCuts[((i % N) + N) % N];
    const left = gateLeft + (i - LIT) * (FW + GAP);
    const lit = i === LIT;
    const img = `data:image/webp;base64,${b64("public" + c.poster)}`;
    return `
    <div style="position:absolute;left:${left}px;top:${EDGE}px;width:${FW}px;height:${FH}px;overflow:hidden;background:#0b0b0c">
      <img src="${img}" style="width:100%;height:100%;object-fit:cover;${lit ? "" : "filter:saturate(.25)"}">
      ${lit ? "" : `<div style="position:absolute;inset:0;background:rgb(11 11 12 / .7)"></div>`}
    </div>
    <div class="mono edge" style="position:absolute;left:${left}px;top:${EDGE - 14}px;width:${FW}px;overflow:hidden;font-size:9px;color:${lit ? "#ecebe7" : "#8d8f93"}">
      ${edge([c.frame, c.piece.catalog])}
    </div>
    <div class="mono edge" style="position:absolute;left:${left}px;top:${EDGE + FH + 5}px;width:${FW}px;overflow:hidden;font-size:9px;color:${lit ? "#ecebe7" : "#8d8f93"}">
      ${edge([c.piece.format, c.piece.duration])}
    </div>`;
  })
  .join("");

const pageB = `
<canvas id="ground" width="${W}" height="${H}"></canvas>
<div style="position:absolute;left:48px;right:48px;top:34px;display:flex;justify-content:space-between;align-items:center">
  ${svgMark(marks.wordmarkSmall, 24)}
  <p style="font-family:Mona;font-size:17px;color:#ecebe7;display:flex;gap:26px"><span>Work</span><span>Contact</span></p>
</div>
<div style="position:absolute;left:0;right:0;top:96px;text-align:center">
  <h1 class="cond" style="font-size:66px;line-height:.95;color:#ecebe7">I'm Bruno Simone, video editor.</h1>
  <p style="font-family:Mona;font-size:21px;line-height:1.4;color:#9a9da3;margin:16px auto 0;max-width:52ch;text-wrap:balance">Short-form and YouTube edits for brands and creators: captions, motion graphics, color and sound.</p>
</div>
<div class="band" style="top:${bandTop}px;width:${W}px;height:${FH + 2 * EDGE}px;background-size:24px ${EDGE}px">
  ${frames}
</div>`;

const groundScript = `
const FRAG=${JSON.stringify(HEADER + dither)},TONES=${JSON.stringify(TONES)};
const glc=document.getElementById("ground"),gl=glc.getContext("webgl2",{antialias:false,alpha:false,preserveDrawingBuffer:true});
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};
const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,"#version 300 es\\nin vec2 a; void main(){ gl_Position = vec4(a,0.,1.); }"));
gl.attachShader(p,sh(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(p);gl.useProgram(p);
gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const U=(n)=>gl.getUniformLocation(p,n);for(const[k,v]of Object.entries(TONES))gl.uniform3fv(U("u_"+k),v);
gl.uniform2f(U("u_ptr"),-1e5,-1e5);gl.viewport(0,0,${W},${H});gl.uniform2f(U("u_res"),${W},${H});
gl.uniform1f(U("u_dpr"),1);gl.uniform1f(U("u_time"),3.0);gl.uniform1f(U("u_amt"),${GROUND_STRENGTH});
gl.drawArrays(gl.TRIANGLES,0,3);`;

const html = `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${VARIANT === "a" ? pageA : pageB}
<script>${VARIANT === "b" ? groundScript : ""}
document.fonts.ready.then(()=>Promise.all([...document.images].map(i=>i.decode()))).then(()=>{window.__ready=true});</script></body>`;

const tmp = mkdtempSync(join(tmpdir(), "og-"));
writeFileSync(join(tmp, "page.html"), html);
const PORT = 9363;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(tmp, "profile")}`, "--hide-scrollbars",
  "--enable-unsafe-swiftshader", "--use-angle=swiftshader", "about:blank",
]);
try {
  let t;
  for (let i = 0; i < 50 && !t; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" }); if (r.ok) t = await r.json(); } catch {}
    await sleep(200);
  }
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pend = new Map();
  ws.onmessage = (m) => { const x = JSON.parse(m.data); if (x.id && pend.has(x.id)) { pend.get(x.id)(x.result); pend.delete(x.id); } };
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; pend.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "file://" + join(tmp, "page.html") });
  for (let k = 0; k < 100; k++) { const r = await send("Runtime.evaluate", { returnByValue: true, expression: "!!window.__ready" }); if (r?.result?.value) break; await sleep(100); }
  await sleep(200);
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  writeFileSync(OUT, Buffer.from(shot.data, "base64"));
  console.log(OUT);
  ws.close();
} finally {
  const gone = new Promise((r) => chrome.once("exit", r));
  chrome.kill();
  await gone;
  rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
