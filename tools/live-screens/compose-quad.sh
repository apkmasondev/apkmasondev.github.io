#!/usr/bin/env bash
# compose-quad.sh <klucz> <raw.mp4> <start> <koniec> <x0,y0> <x1,y1> <x2,y2> <x3,y3> [rozmiar] [crf]
# Jak compose.sh, ale dla ekranu, który na mockupie nie jest idealnym prostokątem
# (laptop minimalnie pod kątem). Narożniki podaje się w pikselach mockupu 1254 px,
# w kolejności: lewy górny, prawy górny, lewy dolny, prawy dolny. Nagranie jest
# przekształcane perspektywicznie i przycinane maską w kształcie ekranu
# z zaokrąglonymi rogami, więc przy ramce nie zostają jasne szpary.
set -euo pipefail
key=$1 raw=$2 s=$3 e=$4 p0=$5 p1=$6 p2=$7 p3=$8 size=${9:-480} crf=${10:-30}
HERE="$(cd "$(dirname "$0")" && pwd)"
W="$(cd "$HERE/../../public/work" && pwd)"
F=0.8
# Ścieżka względna: działa tak samo dla bash i dla Pythona na Windows.
MASK=".mask-$$.png"

read -r BX BY BW BH R0 R1 R2 R3 < <(python - "$p0" "$p1" "$p2" "$p3" "$MASK" <<'EOF'
import sys
from PIL import Image, ImageDraw, ImageFilter
pts = [tuple(map(int, p.split(','))) for p in sys.argv[1:5]]
xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
bx, by = min(xs), min(ys)
bw, bh = max(xs) - bx + 1, max(ys) - by + 1
bw += bw % 2; bh += bh % 2
# Maska 4× większa, wygładzona i zmniejszona — miękka krawędź bez schodków.
S = 4
m = Image.new('L', (1254 * S, 1254 * S), 0)
d = ImageDraw.Draw(m)
tl, tr, bl, br = [(x * S, y * S) for x, y in pts]
d.polygon([tl, tr, br, bl], fill=255)
r = 7 * S
for (cx, cy), (dx, dy) in ((tl, (1, 1)), (tr, (-1, 1)), (bl, (1, -1)), (br, (-1, -1))):
    d.rectangle([min(cx, cx + dx * r), min(cy, cy + dy * r), max(cx, cx + dx * r), max(cy, cy + dy * r)], fill=0)
    ox, oy = cx + dx * r, cy + dy * r
    d.ellipse([ox - r, oy - r, ox + r, oy + r], fill=255)
m = m.filter(ImageFilter.GaussianBlur(S * 0.6)).resize((1254, 1254), Image.LANCZOS)
m.save(sys.argv[5])
rel = [f"{x - bx}:{y - by}" for x, y in pts]
print(bx, by, bw, bh, *rel)
EOF
)

L=$(python -c "print($e-$s)")
OFF=$(python -c "print($e-$s-2*$F)")
# Długość gotowej pętli — ogranicza nieskończone wejścia (mockup i maskę).
DUR=$(python -c "print($e-$s-$F)")
IFS=: read -r X0 Y0 <<<"$R0"; IFS=: read -r X1 Y1 <<<"$R1"
IFS=: read -r X2 Y2 <<<"$R2"; IFS=: read -r X3 Y3 <<<"$R3"

ffmpeg -loglevel error -y -loop 1 -framerate 24 -t "$DUR" -i "$W/$key-1254.webp" -i "$raw" -loop 1 -framerate 24 -t "$DUR" -i "$MASK" -filter_complex "
  [1:v]trim=$s:$e,setpts=PTS-STARTPTS,fps=24,scale=$BW:$BH:flags=lanczos,eq=contrast=1.03:saturation=1.04,
       perspective=x0=$X0:y0=$Y0:x1=$X1:y1=$Y1:x2=$X2:y2=$Y2:x3=$X3:y3=$Y3:sense=destination,split[a][b];
  [a]trim=$F:$L,setpts=PTS-STARTPTS[tail];
  [b]trim=0:$F,setpts=PTS-STARTPTS[head];
  [tail][head]xfade=transition=fade:duration=$F:offset=$OFF,format=yuva420p,
       pad=1254:1254:$BX:$BY:color=black@0[loop];
  [2:v]format=gray[mask];
  [loop][mask]alphamerge[screen];
  [0:v][screen]overlay=0:0:shortest=1,scale=$size:$size:flags=lanczos,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -profile:v high -preset veryslow -crf "$crf" -movflags +faststart -tune film \
  "$key-live-$size.mp4"
rm -f "$MASK"
printf '%s %s KB %ss\n' "$key-live-$size.mp4" "$(( $(stat -c %s "$key-live-$size.mp4") / 1024 ))" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$key-live-$size.mp4")"
