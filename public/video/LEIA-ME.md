# Vídeo do hero

A página já está pronta para o vídeo de 28 segundos. Enquanto os arquivos abaixo não existirem, o hero
roda a mesma narrativa (textos, ícones, sorriso e chamada final) sobre um fundo ilustrado.

Envie para esta pasta (`public/video`) os arquivos com exatamente estes nomes:

| Arquivo | Uso |
|---|---|
| `hero-16x9.mp4` | Vídeo para computador (H.264) |
| `hero-16x9.webm` | Vídeo para computador (WebM, opcional, mais leve) |
| `hero-9x16.mp4` | Vídeo para celular (H.264) |
| `hero-9x16.webm` | Vídeo para celular (WebM, opcional) |
| `poster-sorriso-16x9.jpg` | Último quadro do sorriso, computador (pôster e fundo da chamada final) |
| `poster-sorriso-9x16.jpg` | Último quadro do sorriso, celular |
| `legendas-pt.vtt` | Legendas da locução (já incluído) |

Não é preciso mudar nenhum código: a página detecta os arquivos sozinha.

## Especificações

- 28 s, 24 fps, sem texto, logotipos ou grafismos no vídeo (os textos são camadas da página).
- Deixe o terço superior do quadro livre nos 5 s finais (é onde aparece a mensagem principal).
- Trilha e locução (opcional) embutidas no próprio vídeo; a página oferece o botão "Ativar som".

## Tempos que a página usa (contados do início do vídeo)

| Tempo | Na tela |
|---|---|
| 2 s | "Você prepara tudo. O quarto, a mamadeira, o primeiro passinho..." |
| 7 s | "Mas tem coisas que não dá pra prever." |
| 11 s | "Uma febre alta de madrugada." + termômetro |
| 13,5 s | "Uma alergia inesperada." + gota de remédio |
| 16 s | "Um susto que não espera a hora." + seringa e hospital |
| 18 s | Textos e ícones se dissolvem (o bebê para) |
| 19 s | "Com o Plano de Saúde, você não está sozinho." |
| 19,8 s | "São pediatras, emergências e exames — prontos para o que vier." |
| 24 s | "Proteja o futuro que está só começando." / "Contrate hoje e durma tranquilo amanhã." |
| 24,4 s | Botão "Quero contratar" |

Para mudar algum tempo, edite as constantes no início de `src/components/landing/HeroStory.tsx`.

## Compressão sugerida (ffmpeg)

```bash
# MP4 com início rápido (carregamento progressivo)
ffmpeg -i original-16x9.mov -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -r 24 \
  -c:a aac -b:a 128k -movflags +faststart hero-16x9.mp4

# WebM
ffmpeg -i original-16x9.mov -c:v libvpx-vp9 -crf 34 -b:v 0 -r 24 -c:a libopus hero-16x9.webm

# Pôster (último quadro)
ffmpeg -sseof -0.1 -i hero-16x9.mp4 -frames:v 1 -q:v 3 poster-sorriso-16x9.jpg
```

Repita os comandos para a versão 9:16.
