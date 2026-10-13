#!/bin/bash
# Monta o vídeo do hero (28 s, 24 fps) a partir do clipe de 11,36 s:
#   0–19 s  câmera lenta (motion interpolation) do trecho 0–6,04 s, até o sorriso
#   19–28 s quadro do sorriso congelado com aproximação lenta
set -euo pipefail
SRC=/mnt/user-data/uploads/3196565-uhd_3840_2160_25fps.mp4
W=$(dirname "$0")
cd "$W"
SMILE=6.04
SLOW=$(python3 -c "print(19/$SMILE)")

echo "== 16:9 câmera lenta"
ffmpeg -loglevel error -y -t $SMILE -i "$SRC" \
  -vf "scale=1920:1080:flags=lanczos,setpts=${SLOW}*PTS,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,trim=duration=19,setpts=PTS-STARTPTS" \
  -an -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p seg1_h.mp4

echo "== 16:9 sorriso congelado"
ffmpeg -loglevel error -y -ss $SMILE -i "$SRC" -frames:v 1 -q:v 1 smile_4k.png
# aproximação lenta (1.00 → 1.12) em direção ao rosto
ffmpeg -loglevel error -y -loop 1 -framerate 24 -t 9 -i smile_4k.png \
  -vf "zoompan=z='1+0.12*on/216':x='(iw-iw/zoom)*0.72':y='(ih-ih/zoom)*0.28':d=216:s=1920x1080:fps=24" \
  -frames:v 216 -an -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p seg2_h.mp4

echo "== 9:16 câmera lenta (recorte acompanhando o bebê)"
# centro do recorte: 0,58 da largura até 4 s, depois desliza até 0,80 no sorriso
CX="(0.58+max(0\,t-4)*0.108)*3840-607"
ffmpeg -loglevel error -y -t $SMILE -i "$SRC" \
  -vf "crop=1215:2160:'max(0\,min(3840-1215\,$CX))':0,scale=1080:1920:flags=lanczos,setpts=${SLOW}*PTS,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,trim=duration=19,setpts=PTS-STARTPTS" \
  -an -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p seg1_v.mp4

echo "== 9:16 sorriso congelado"
ffmpeg -loglevel error -y -i smile_4k.png -vf "crop=1215:2160:2465:0" smile_v.png
ffmpeg -loglevel error -y -loop 1 -framerate 24 -t 9 -i smile_v.png \
  -vf "zoompan=z='1+0.12*on/216':x='(iw-iw/zoom)*0.5':y='(ih-ih/zoom)*0.2':d=216:s=1080x1920:fps=24" \
  -frames:v 216 -an -c:v libx264 -crf 14 -preset fast -pix_fmt yuv420p seg2_v.mp4

for o in h v; do
  printf "file 'seg1_%s.mp4'\nfile 'seg2_%s.mp4'\n" $o $o > list_$o.txt
  ffmpeg -loglevel error -y -f concat -safe 0 -i list_$o.txt -c copy master_$o.mp4
done

echo "== codificação final"
mkdir -p out
ffmpeg -loglevel error -y -i master_h.mp4 -c:v libx264 -crf 24 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an out/hero-16x9.mp4
ffmpeg -loglevel error -y -i master_v.mp4 -c:v libx264 -crf 25 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an out/hero-9x16.mp4
ffmpeg -loglevel error -y -i master_h.mp4 -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 -an out/hero-16x9.webm
ffmpeg -loglevel error -y -i master_v.mp4 -c:v libvpx-vp9 -crf 37 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 -an out/hero-9x16.webm
ffmpeg -loglevel error -y -sseof -0.05 -i master_h.mp4 -frames:v 1 -q:v 4 out/poster-sorriso-16x9.jpg
ffmpeg -loglevel error -y -sseof -0.05 -i master_v.mp4 -frames:v 1 -q:v 4 out/poster-sorriso-9x16.jpg
ls -la out
echo DONE
