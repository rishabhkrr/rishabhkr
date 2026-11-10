"""Render the share image and Apple touch icon from the SVGs next to this file.
Usage: python scripts/brand/render.py   (needs: pip install pymupdf)"""
import pathlib, pymupdf
here = pathlib.Path(__file__).parent
public = here.parent.parent / "public"
for name in ["og", "apple-touch-icon"]:
    svg = pymupdf.open(here / f"{name}.svg")
    page = svg[0]
    pix = page.get_pixmap(alpha=False)  # 1:1 with the SVG's width/height
    pix.save(public / f"{name}.png")
    print(name, pix.width, "x", pix.height)

# 32px PNG favicon fallback from the same tile as the SVG favicon
icon = pymupdf.open(public / "icon.svg")[0]
pix = icon.get_pixmap(matrix=pymupdf.Matrix(0.5, 0.5), alpha=True)
pix.save(public / "favicon-32.png")
print("favicon-32", pix.width, "x", pix.height)
