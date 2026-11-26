#!/usr/bin/env bash
# Builds the full pieces shown on the home (Bruno, 24–25/11): Roller Pro (short, long and the two
# before/afters), Félicette and all seven parts of Pick a pile, plus the seven Pick a pile covers.
# Full pieces are played with sound on request only (preload none), so they ship as one H.264
# file each (+AAC), web-optimised (faststart). The before/afters stay at 1080p so their small
# labels read; the rest is 720p. Outputs in public/media/work.
set -euo pipefail

K="${KIT_DIR:-$HOME/Documents/Kit Claude DaVinci}/entrega"
RP="$K/Roller Pro"
SH="$K/Shashi pick a pile"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/media/work"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

# id | source | width x height | crf | poster at (s), empty when the piece has a cover of its own
# Pick a pile parts are also capped (-maxrate 600k): a few busy parts ran heavier than the rest.
# Bruno, 25/11: everything plays on the site, so the whole set has to stay under Vercel Hobby's
# 100 MB upload. Tested on Pick a pile: crf 32 at 720p (~0.55 Mbps) is indistinguishable from 25
# frame by frame, subtitles included; motion-heavier pieces get 31; before/afters stay 1080p.
P="$SH/Pick a pile"
PIECES=(
  "roller-short|$RP/Roller Pro - short (spec).mp4|720x1280|31|52.5"
  "roller-long|$RP/Roller Pro - completo (spec).mp4|1280x720|31|45.0"
  "roller-ba-short|$RP/Roller Pro - antes y despues (short).mp4|1920x1080|30|2.0"
  "roller-ba-long|$RP/Roller Pro - antes y despues (completo).mp4|1920x1080|30|2.0"
  "felicette|$K/Felicette/Felicette - The first cat in space.mp4|720x1280|31|"
  "pile-1-1|$P - Pile 1 - Part 1 of 4.mp4|720x1280|32||600k"
  "pile-1-2|$P - Pile 1 - Part 2 of 4.mp4|720x1280|32||600k"
  "pile-1-3|$P - Pile 1 - Part 3 of 4.mp4|720x1280|32||600k"
  "pile-1-4|$P - Pile 1 - Part 4 of 4.mp4|720x1280|32||600k"
  "pile-2-1|$P - Pile 2 - Part 1 of 3.mp4|720x1280|32||600k"
  "pile-2-2|$P - Pile 2 - Part 2 of 3.mp4|720x1280|32||600k"
  "pile-2-3|$P - Pile 2 - Part 3 of 3.mp4|720x1280|32||600k"
)

for row in "${PIECES[@]}"; do
  IFS='|' read -r id src size crf at cap <<<"$row"
  if [ $# -gt 0 ] && [[ " $* " != *" $id "* ]]; then continue; fi
  w="${size%x*}"; h="${size#*x}"
  ffmpeg -nostdin -v error -y -i "$src" \
    -vf "scale=$w:$h:flags=lanczos,format=yuv420p" \
    -c:v libx264 -profile:v high -crf "$crf" ${cap:+-maxrate "$cap" -bufsize 1200k} -preset veryslow -tune film -g 60 \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$id.mp4"
  if [ -n "$at" ]; then
    ffmpeg -nostdin -v error -y -ss "$at" -i "$src" -frames:v 1 -vf "scale=$w:$h:flags=lanczos" "$TMP/$id.png"
    cwebp -quiet -q 78 "$TMP/$id.png" -o "$OUT/$id.webp"
  fi
  echo "$id: $(du -h "$OUT/$id.mp4" | cut -f1)"
done

# covers drawn for the pieces themselves
ffmpeg -nostdin -v error -y -i "$K/Felicette/Felicette - The first cat in space (portada).jpg" -vf "scale=720:1280:flags=lanczos" "$TMP/felicette.png"
cwebp -quiet -q 78 "$TMP/felicette.png" -o "$OUT/felicette.webp"
for f in "$SH/Portadas/"*.jpg; do
  n="$(basename "$f" .jpg)"
  pile="$(sed -E 's/.*Pile ([0-9]).*/\1/' <<<"$n")"
  part="$(sed -E 's/.*Part ([0-9]).*/\1/' <<<"$n")"
  ffmpeg -nostdin -v error -y -i "$f" -vf "scale=720:1280:flags=lanczos" "$TMP/c.png"
  cwebp -quiet -q 74 "$TMP/c.png" -o "$OUT/pile-$pile-$part.webp"
done

# Félicette: frames printed beside the piece (keep in sync with `felicette.stills` in work.ts)
for at in 21 35 43.5 49 63; do
  n="$(printf "%02d" "${at%.*}")"
  ffmpeg -nostdin -v error -y -ss "$at" -i "$K/Felicette/Felicette - The first cat in space.mp4" -frames:v 1 -vf "scale=360:640:flags=lanczos" "$TMP/s.png"
  cwebp -quiet -q 76 "$TMP/s.png" -o "$OUT/felicette-$n.webp"
done

rm -rf "$TMP"
ls -la "$OUT"
du -sh "$OUT"
