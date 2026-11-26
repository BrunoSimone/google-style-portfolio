#!/usr/bin/env bash
# Screenshots of the live sites for /web: the first screen at desktop (1440×900) and phone
# (390×844, emulated as a touch phone, 2×), saved as WebP in public/media/web.
# The capture itself is capture-webs.mjs (DevTools protocol of the installed Chrome; headless
# --window-size cannot go narrower than ~500 px, so a phone needs real emulation).
# Re-run after a site changes. Needs Google Chrome, Node and cwebp.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$(cd "$DIR/../.." && pwd)/public/media/web"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

node "$DIR/capture-webs.mjs" "$TMP"
for png in "$TMP"/*.png; do
  cwebp -quiet -q 80 "$png" -o "$OUT/$(basename "${png%.png}").webp"
done

rm -rf "$TMP"
ls -la "$OUT"
