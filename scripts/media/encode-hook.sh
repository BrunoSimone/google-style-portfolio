#!/usr/bin/env bash
# Builds the reel for the home's video section (Bruno, 24/11): a few seconds of every selected
# piece, interleaved (Pick a pile, Roller Pro short, Félicette; Bruno, 24/11). Each cut is loudness-matched so the
# pieces sit at one level with sound on. The cut list below is also in src/content/work.ts.
# Outputs H.264 (+AAC) and AV1 (+Opus) at 540x960, plus one WebP poster per cut.
set -euo pipefail

K="${KIT_DIR:-$HOME/Documents/Kit Claude DaVinci}/entrega"
SH="$K/Shashi pick a pile"
RP="$K/Roller Pro/Roller Pro - short (spec).mp4"
FE="$K/Felicette/Felicette - The first cat in space.mp4"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/media/hook"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

DUR=3.5
# source|start(s)
CUTS=(
  "$SH/Pick a pile - Pile 1 - Part 1 of 4.mp4|4.0"
  "$RP|30.0"
  "$FE|41.0"
  "$SH/Pick a pile - Pile 1 - Part 2 of 4.mp4|31.0"
  "$RP|41.0"
  "$FE|54.0"
  "$SH/Pick a pile - Pile 1 - Part 4 of 4.mp4|76.0"
)

i=0
list="$TMP/list.txt"
: > "$list"
for c in "${CUTS[@]}"; do
  in="${c%|*}"
  start="${c##*|}"
  i=$((i + 1))
  n=$(printf "%02d" "$i")
  ffmpeg -nostdin -v error -y -ss "$start" -t "$DUR" -i "$in" \
    -vf "scale=540:960:flags=lanczos,fps=30,format=yuv420p" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:d=0.06,afade=t=out:st=$(echo "$DUR - 0.08" | bc):d=0.08,aresample=48000" \
    -c:v libx264 -crf 18 -preset slow -c:a pcm_s16le "$TMP/$n.mov"
  echo "file '$TMP/$n.mov'" >> "$list"
  # poster: the first frame of the cut, sharp enough for a 3x phone screen
  ffmpeg -nostdin -v error -y -ss 0.4 -i "$TMP/$n.mov" -frames:v 1 -vf "scale=540:960" "$TMP/$n.png"
  cwebp -quiet -q 72 "$TMP/$n.png" -o "$OUT/cut-$n.webp"
done

ffmpeg -v error -y -f concat -safe 0 -i "$list" -c copy "$TMP/reel.mov"

ffmpeg -v error -y -i "$TMP/reel.mov" \
  -c:v libx264 -profile:v high -crf 27 -preset veryslow -tune film -g 30 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/hook.mp4"

ffmpeg -v error -y -i "$TMP/reel.mov" \
  -c:v libsvtav1 -crf 40 -preset 5 -g 30 -pix_fmt yuv420p \
  -c:a libopus -b:a 80k "$OUT/hook.webm"

rm -rf "$TMP"
ls -la "$OUT"
