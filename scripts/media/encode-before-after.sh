#!/usr/bin/env bash
# Builds the before/after pairs: the same seconds of four delivered pieces, once as shot and once
# as delivered. Each window sits inside one uncut stretch of its source take, so raw and final run
# the same length and stay in sync (no cuts inside a window: a cut would change the duration).
#
# Alignment (raw time = final time + offset) was measured, not assumed: by audio-envelope
# correlation of the delivered mix against the take's voice (ncc 0.86–0.95), and for Pile 2 by
# motion correlation (ncc 0.97). Every offset agrees with the cut lists to within one frame.
#
#   pile-1      Pick a pile · Pile 1 · Part 2 (final 12.75–17.55): Four of Cups, the Waite plate
#               raw: trabajo/shashi/cfr/IMG_9968.mov (iPhone HEVC 10-bit HLG, CFR copy)
#   pile-2      Pick a pile · Pile 2 · Part 2 (final 14.80–19.80): Five of Swords in hand
#               raw: trabajo/shashi/cfr/IMG_9974.mov
#   michi       Michi sorteo (final 26.35–30.25): «¿Qué esperás? No duermas, podés tener esta michi.»,
#               the closing punch-ins (one uncut stretch of the take, split only for the zooms).
#               Starts after the product sticker has left the frame: it is a stock product photo.
#               raw: trabajo/michi/michi_fuente_cfr.mov (iPhone 2160×3840 HLG, CFR copy)
#   ser-editor  Ser editor, social cut (final 58.00–63.00): 16:9 camera to 9:16
#               raw: trabajo/camara_30fps.mov (1280×720 camera file, 30 fps copy, kept 16:9)
#
# HLG takes are tone-mapped to SDR the way trabajo/shashi/previa/hacer.py does, with no grade.
# Outputs H.264 and AV1, 30 fps, muted, plus one WebP poster each, in public/media/before-after.
set -euo pipefail

K="${KIT_DIR:-$HOME/Documents/Kit Claude DaVinci}"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/media/before-after"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

TM="zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p"
V="scale=540:960:flags=lanczos,fps=30,format=yuv420p"
H="scale=540:304:flags=lanczos,fps=30,format=yuv420p" # a 16:9 take stays 16:9
POSTER_AT=1.0

# id | final file | final start | seconds | raw file | raw offset | raw filter
PAIRS=(
  "pile-1|$K/trabajo/shashi/final_1080/Shashi V1 P2.mp4|12.75|4.8|$K/trabajo/shashi/cfr/IMG_9968.mov|11.245|$TM,$V"
  "pile-2|$K/trabajo/shashi/final_1080/Shashi V2 P2.mp4|14.80|5.0|$K/trabajo/shashi/cfr/IMG_9974.mov|8.155|$TM,$V"
  "michi|$K/entrega/michi-sorteo_v1.mp4|26.35|3.9|$K/trabajo/michi/michi_fuente_cfr.mov|18.12|$TM,$V"
  "ser-editor|$K/entrega/ser-editor_redes_v2.mp4|58.00|5.0|$K/trabajo/camara_30fps.mov|50.215|$H"
)

encode() { # src.mp4 → out base name
  ffmpeg -nostdin -v error -y -i "$1" -an \
    -c:v libx264 -profile:v high -crf 28 -preset veryslow -tune film -g 30 -pix_fmt yuv420p -movflags +faststart \
    "$OUT/$2.mp4"
  ffmpeg -nostdin -v error -y -i "$1" -an -c:v libsvtav1 -crf 42 -preset 5 -g 30 -pix_fmt yuv420p "$OUT/$2.webm"
  ffmpeg -nostdin -v error -y -ss "$POSTER_AT" -i "$1" -frames:v 1 "$TMP/$2.png"
  cwebp -quiet -q 72 "$TMP/$2.png" -o "$OUT/$2.webp"
}

for row in "${PAIRS[@]}"; do
  IFS='|' read -r id final t0 dur raw off rawvf <<<"$row"
  rawt=$(echo "$t0 + $off" | bc)
  ffmpeg -nostdin -v error -y -ss "$t0" -i "$final" -t "$dur" -an -vf "$V" -c:v libx264 -crf 14 "$TMP/$id-final.mp4"
  ffmpeg -nostdin -v error -y -ss "$rawt" -i "$raw" -t "$dur" -an -vf "$rawvf" -c:v libx264 -crf 14 "$TMP/$id-raw.mp4"
  encode "$TMP/$id-final.mp4" "$id-final"
  encode "$TMP/$id-raw.mp4" "$id-raw"
  echo "$id: final $t0 + ${dur}s, raw $rawt"
done

rm -rf "$TMP"
ls -la "$OUT"
