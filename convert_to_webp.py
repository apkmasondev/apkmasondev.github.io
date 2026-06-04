import os
from PIL import Image

public_dir = "d:/Projekty AI/ApkMason.dev/portfolio-site/public"

for filename in os.listdir(public_dir):
    if filename.endswith(".png"):
        img_path = os.path.join(public_dir, filename)
        webp_path = os.path.join(public_dir, filename.replace(".png", ".webp"))
        
        try:
            img = Image.open(img_path)
            img.save(webp_path, "WEBP", quality=85)
            print(f"Converted {filename} to {os.path.basename(webp_path)}")
            # Optional: os.remove(img_path) to delete original, but let's keep it safe for now or delete if needed.
            # Actually, to save space, let's remove the original PNGs except maybe favicon.
            if filename != "favicon_rounded.png":
                os.remove(img_path)
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

print("Done.")
