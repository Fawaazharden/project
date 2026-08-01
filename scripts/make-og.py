"""Generate a Vocalxlabs blog OG image (1200x630) matching the house style.

Usage:
    python scripts/make-og.py <slug> "<Category>" "<Headline>"

Palette and geometry were sampled from the existing OG images so new posts
stay visually identical to the ones already shipped.
"""
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 37, 64)          # #0A2540 navy
ACCENT = (4, 120, 87)      # #047857 green
TITLE = (255, 255, 255)
DOMAIN = (148, 170, 190)   # #94AABE
LINE = (11, 54, 81)        # #0B3651, also the decorative circle

SERIF_BOLD = r"C:\Windows\Fonts\georgiab.ttf"
SANS_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"

MARGIN = 80
TITLE_MAX_W = 1010


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def build(slug, category, headline):
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    # Decorative circle, bottom right, clipped by the canvas edges.
    cx, cy, r = 1055, 565, 275
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=LINE)

    # Green accent bar above the category label.
    d.rectangle([MARGIN, 80, MARGIN + 76, 87], fill=ACCENT)

    # Category eyebrow, uppercase with wide tracking.
    eyebrow_font = ImageFont.truetype(SANS_BOLD, 21)
    x = MARGIN
    for ch in category.upper():
        d.text((x, 116), ch, font=eyebrow_font, fill=ACCENT)
        x += d.textlength(ch, font=eyebrow_font) + 2.2

    # Headline. Shrink the type until it fits in the available block.
    for size in (68, 64, 60, 56, 52, 48, 44):
        title_font = ImageFont.truetype(SERIF_BOLD, size)
        lines = wrap(d, headline, title_font, TITLE_MAX_W)
        leading = int(size * 1.28)
        if len(lines) * leading <= 300:
            break

    y = 196
    for line in lines:
        d.text((MARGIN, y), line, font=title_font, fill=TITLE)
        y += leading

    # Footer rule and brand lock-up.
    d.rectangle([MARGIN, 496, 1120, 497], fill=LINE)
    d.text((MARGIN, 533), "Vocalxlabs", font=ImageFont.truetype(SANS_BOLD, 25), fill=TITLE)
    d.text((MARGIN, 570), "vocalxlabs.com", font=ImageFont.truetype(SANS_BOLD, 19), fill=DOMAIN)

    out = f"public/ai-acquisition-manager/img/og/{slug}.png"
    im.save(out, "PNG", optimize=True)
    print(f"wrote {out}  ({len(lines)} title lines at {title_font.size}px)")


if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2], sys.argv[3])
