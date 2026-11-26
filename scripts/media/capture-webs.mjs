// Screenshots of the live sites for /web: the first screen at desktop (1440×900) and phone
// (390×844, emulated as a touch phone) size, at 2×, through the DevTools protocol of the
// installed Google Chrome (no extra packages). PNGs go to a temp folder; capture-webs.sh turns
// them into WebP in public/media/web.
//
//   node scripts/media/capture-webs.mjs <out-dir>
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = process.argv[2];
const PORT = 9333;
const SITES = [
  { slug: "jubigestor", url: "https://www.jubigestor.xyz/" },
  { slug: "canela", url: "https://www.canela-store.com/" },
];
const SIZES = [
  { name: "desktop", width: 1440, height: 900, scale: 1, mobile: false },
  {
    name: "phone",
    width: 390,
    height: 844,
    scale: 2,
    mobile: true,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), "capture-"));
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
]);

async function target() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" });
      if (r.ok) return r.json();
    } catch {}
    await sleep(200);
  }
  throw new Error("Chrome did not start");
}

function session(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const waiters = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
      waiters.filter((w) => w.method === msg.method).forEach((w) => w.resolve(msg.params));
    }
  };
  const ready = new Promise((r) => (ws.onopen = r));
  return {
    ready,
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        const n = ++id;
        pending.set(n, { resolve, reject });
        ws.send(JSON.stringify({ id: n, method, params }));
      }),
    once: (method) => new Promise((resolve) => waiters.push({ method, resolve })),
    close: () => ws.close(),
  };
}

try {
  for (const site of SITES) {
    for (const size of SIZES) {
      const t = await target();
      const s = session(t.webSocketDebuggerUrl);
      await s.ready;
      await s.send("Page.enable");
      await s.send("Emulation.setDeviceMetricsOverride", {
        width: size.width,
        height: size.height,
        deviceScaleFactor: size.scale,
        mobile: size.mobile,
      });
      if (size.mobile) {
        await s.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
        await s.send("Network.setUserAgentOverride", { userAgent: size.ua });
      }
      const loaded = s.once("Page.loadEventFired");
      await s.send("Page.navigate", { url: site.url });
      await loaded;
      await sleep(3500); // fonts, hero media and entrance motion settle
      const { data } = await s.send("Page.captureScreenshot", { format: "png" });
      writeFileSync(join(OUT, `${site.slug}-${size.name}.png`), Buffer.from(data, "base64"));
      console.log(`${site.slug}-${size.name}`);
      s.close();
      await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`);
    }
  }
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
