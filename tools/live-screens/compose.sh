#!/usr/bin/env bash
# compose.sh <klucz> <raw.mp4> <start> <koniec> <x> <y> <w> <h> <rozmiar> <crf>
# Wycina fragment, zapętla go przenikaniem ostatnich F sekund w początek,
# wpasowuje w ekran laptopa na mockupie 1254 px i zapisuje kafel <rozmiar> px.
set -euo pipefail
key=$1 raw=$2 s=$3 e=$4 x=$5 y=$6 w=$7 h=$8 size=${9:-480} crf=${10:-30}
# Katalog z mockupami — względem położenia skryptu, niezależnie od katalogu roboczego.
W="$(cd "$(dirname "$0")/../../public/work" && pwd)"
F=0.8
L=$(python -c "print($e-$s)")
OFF=$(python -c "print($e-$s-2*$F)")
ffmpeg -loglevel error -y -loop 1 -framerate 24 -i "$W/$key-1254.webp" -i "$raw" -filter_complex "
  [1:v]trim=$s:$e,setpts=PTS-STARTPTS,fps=24,scale=$w:$h:flags=lanczos,eq=contrast=1.03:saturation=1.04,split[a][b];
  [a]trim=$F:$L,setpts=PTS-STARTPTS[tail];
  [b]trim=0:$F,setpts=PTS-STARTPTS[head];
  [tail][head]xfade=transition=fade:duration=$F:offset=$OFF[loop];
  [0:v][loop]overlay=$x:$y:shortest=1,scale=$size:$size:flags=lanczos,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -profile:v high -preset veryslow -crf "$crf" -movflags +faststart -tune film \
  "$key-live-$size.mp4"
printf '%s %s KB %ss\n' "$key-live-$size.mp4" "$(( $(stat -c %s "$key-live-$size.mp4") / 1024 ))" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$key-live-$size.mp4")"
