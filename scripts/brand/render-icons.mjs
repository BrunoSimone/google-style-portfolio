// Renders the site's icons (Bruno, 25/11): the B of the logotype in bone over the site's own
// dither ground (the shader in src/components/bg/shaders.ts, the same frame every time), at 60 %
// strength so the waves read at tab size. Dither cells scale with the icon (1 px at 16 and 32).
// Uses the installed Google Chrome (headless, WebGL through SwiftShader) and ffmpeg for the .ico;
// no packages. Writes into src/app: favicon.ico (32), icon1.png (32), icon2.png (192),
// icon3.png (512), apple-icon.png (180).
//
//   node scripts/brand/render-icons.mjs
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const APP = join(ROOT, "src/app");
const STRENGTH = 0.6;
const TIME = 3.0; // the ground's clock: which frame of the waves
const CAP = 0.62; // the B's cap height, share of the icon
const SIZES = { "icon1.png": 32, "icon2.png": 192, "icon3.png": 512, "apple-icon.png": 180, "favicon.png": 32 };

const { HEADER, TONES } = await import(join(ROOT, "src/components/bg/gl.ts"));
const { dither } = await import(join(ROOT, "src/components/bg/shaders.ts"));
const { marks } = await import(join(ROOT, "src/brand/marks.ts"));

const page = `<!doctype html><meta charset="utf-8"><script>
const FRAG=${JSON.stringify(HEADER + dither)},TONES=${JSON.stringify(TONES)};
const MARKS=${JSON.stringify({ b16: marks.b16, b32: marks.b32, b64: marks.b64, b180: marks.b180 })};
const glc=document.createElement("canvas"),gl=glc.getContext("webgl2",{antialias:false,alpha:false,preserveDrawingBuffer:true});
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};
const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,"#version 300 es\\nin vec2 a; void main(){ gl_Position = vec4(a,0.,1.); }"));
gl.attachShader(p,sh(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(p);gl.useProgram(p);
gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const U=(n)=>gl.getUniformLocation(p,n);for(const[k,v]of Object.entries(TONES))gl.uniform3fv(U("u_"+k),v);gl.uniform2f(U("u_ptr"),-1e5,-1e5);
window.icon=(size)=>{
  const cell=Math.max(1,Math.round(size/45));
  glc.width=size;glc.height=size;gl.viewport(0,0,size,size);
  gl.uniform2f(U("u_res"),size,size);gl.uniform1f(U("u_dpr"),cell/3);gl.uniform1f(U("u_time"),${TIME});gl.uniform1f(U("u_amt"),${STRENGTH});
  gl.drawArrays(gl.TRIANGLES,0,3);
  const c=document.createElement("canvas");c.width=size;c.height=size;const x=c.getContext("2d");x.drawImage(glc,0,0);
  const M=MARKS[size<=16?"b16":size<=32?"b32":size<=64?"b64":"b180"],ink=M.width-2*M.inkLeft,k=size*${CAP}/M.cap;
  x.translate((size-ink*k)/2-M.inkLeft*k,(size-M.cap*k)/2);x.scale(k,k);x.fillStyle="#ecebe7";x.fill(new Path2D(M.d));
  return c.toDataURL("image/png");
};
window.__ready=true;
</script>`;

const tmp = mkdtempSync(join(tmpdir(), "icons-"));
writeFileSync(join(tmp, "page.html"), page);
const PORT = 9361;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(tmp, "profile")}`,
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
  await send("Page.navigate", { url: "file://" + join(tmp, "page.html") });
  for (let k = 0; k < 100; k++) { const r = await send("Runtime.evaluate", { returnByValue: true, expression: "!!window.__ready" }); if (r?.result?.value) break; await sleep(100); }
  for (const [file, size] of Object.entries(SIZES)) {
    const r = await send("Runtime.evaluate", { returnByValue: true, expression: `icon(${size})` });
    const out = file === "favicon.png" ? join(tmp, file) : join(APP, file);
    writeFileSync(out, Buffer.from(r.result.value.split(",")[1], "base64"));
    console.log(file, size);
  }
  ws.close();
} finally {
  chrome.kill();
}
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", join(tmp, "favicon.png"), join(APP, "favicon.ico")]);
console.log("favicon.ico 32");
rmSync(tmp, { recursive: true, force: true });
