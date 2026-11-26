#!/usr/bin/env bash
# Builds the gallery: one muted loop and one poster per delivered piece.
#
# Pick a pile parts loop over their opening seconds, where the arch title card «Pile One ·
# Part N of 4» sits over the cards: side by side, the posters show the same identity carried
# through every part (in Part 1 the title enters when the reading starts, after the intro).
# Michi sorteo loops over its hook (no product sticker in frame); Ser editor over its opening.
# Loops are only fetched when a visitor taps a frame; the posters load with the page.
#
# Outputs H.264 and AV1 at 540x960, 30 fps, muted, plus a WebP poster, in public/media/gallery.
set -euo pipefail

K="${KIT_DIR:-$HOME/Documents/Kit Claude DaVinci}"
SH="$K/entrega/Shashi pick a pile"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/media/gallery"
TMP="$(mktemp -d)"
mkdir -p "$OUT"
V="scale=540:960:flags=lanczos,fps=30,format=yuv420p"
DUR=6

# id | source | loop start (s) | poster at (s, inside the loop)
PIECES=(
  "pile-1-1|$SH/Pick a pile - Pile 1 - Part 1 of 4.mp4|11.0|1.6"
  "pile-1-2|$SH/Pick a pile - Pile 1 - Part 2 of 4.mp4|0.0|2.6"
  "pile-1-3|$SH/Pick a pile - Pile 1 - Part 3 of 4.mp4|0.0|2.6"
  "pile-1-4|$SH/Pick a pile - Pile 1 - Part 4 of 4.mp4|0.0|2.6"
  "pile-2-1|$SH/Pick a pile - Pile 2 - Part 1 of 3.mp4|11.0|1.2"
  "pile-2-2|$SH/Pick a pile - Pile 2 - Part 2 of 3.mp4|0.0|2.6"
  "pile-2-3|$SH/Pick a pile - Pile 2 - Part 3 of 3.mp4|0.0|2.6"
  "michi|$K/entrega/michi-sorteo_v1.mp4|0.0|3.0"
  "ser-editor|$K/entrega/ser-editor_redes_v2.mp4|0.0|0.3"
)

for row in "${PIECES[@]}"; do
  IFS='|' read -r id src t0 at <<<"$row"
  ffmpeg -nostdin -v error -y -ss "$t0" -i "$src" -t "$DUR" -an -vf "$V" -c:v libx264 -crf 14 "$TMP/$id.mp4"
  ffmpeg -nostdin -v error -y -i "$TMP/$id.mp4" -an \
    -c:v libx264 -profile:v high -crf 28 -preset veryslow -tune film -g 30 -pix_fmt yuv420p -movflags +faststart \
    "$OUT/$id.mp4"
  ffmpeg -nostdin -v error -y -i "$TMP/$id.mp4" -an -c:v libsvtav1 -crf 42 -preset 5 -g 30 -pix_fmt yuv420p "$OUT/$id.webm"
  ffmpeg -nostdin -v error -y -ss "$at" -i "$TMP/$id.mp4" -frames:v 1 "$TMP/$id.png"
  cwebp -quiet -q 72 "$TMP/$id.png" -o "$OUT/$id.webp"
  echo "$id: $t0 + ${DUR}s, poster at +$at"
done

rm -rf "$TMP"
ls -la "$OUT"
