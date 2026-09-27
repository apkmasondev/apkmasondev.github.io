"""Powiększone wycinki wokół przybliżonych narożników ekranu, z siatką co 10 px."""
import sys
from PIL import Image, ImageDraw

src, out = sys.argv[1], sys.argv[2]
pts = [tuple(map(int, p.split(','))) for p in sys.argv[3:7]]
img = Image.open(src).convert('RGB')
R, Z = 40, 5
tiles = []
for (cx, cy) in pts:
    crop = img.crop((cx - R, cy - R, cx + R, cy + R)).resize((2 * R * Z, 2 * R * Z), Image.NEAREST)
    d = ImageDraw.Draw(crop)
    for i in range(0, 2 * R + 1, 10):
        v = (cx - R + i)
        d.line([(i * Z, 0), (i * Z, 2 * R * Z)], fill=(255, 255, 0), width=1)
        d.text((i * Z + 2, 2), str(v), fill=(255, 255, 0))
        h = (cy - R + i)
        d.line([(0, i * Z), (2 * R * Z, i * Z)], fill=(0, 255, 255), width=1)
        d.text((2, i * Z + 2), str(h), fill=(0, 255, 255))
    tiles.append(crop)
W = tiles[0].width
sheet = Image.new('RGB', (W * 2 + 10, W * 2 + 10), 'white')
for i, t in enumerate(tiles):
    sheet.paste(t, ((i % 2) * (W + 10), (i // 2) * (W + 10)))
sheet.save(out)
