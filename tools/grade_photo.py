"""Lightroom-style grade for the Techie Talk group photo.

Approximates the requested slider values (mid-points of the suggested ranges)
with standard image operations. Highlights/Shadows use a blurred-luminance
mask, as Lightroom does, so local contrast is preserved.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

SRC, DST, CMP = sys.argv[1], sys.argv[2], sys.argv[3]

P = dict(
    exposure=0.35,   # EV
    contrast=8,
    highlights=-42,
    shadows=42,
    whites=8,
    blacks=-8,
    temp_k=-350,     # cooler
    tint=5,          # toward magenta
    texture=4,
    clarity=3,
    dehaze=3,
    vibrance=12,
    saturation=-2,
)

def srgb_to_lin(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)

def lin_to_srgb(x):
    x = np.clip(x, 0, 1)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * x ** (1 / 2.4) - 0.055)

def luma(rgb):
    return rgb[..., 0] * 0.2126 + rgb[..., 1] * 0.7152 + rgb[..., 2] * 0.0722

def blur(ch, radius):
    im = Image.fromarray(np.clip(ch * 255, 0, 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255

def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)

img = np.asarray(Image.open(SRC).convert('RGB'), dtype=np.float32) / 255

# --- exposure and white balance, in linear light --------------------------
lin = srgb_to_lin(img) * (2 ** P['exposure'])
# ~6% red/blue shift per 1000K around daylight; tint moves green vs magenta.
k = P['temp_k'] / 1000 * 0.06
lin[..., 0] *= 1 + k
lin[..., 2] *= 1 - k
lin[..., 1] *= 1 - P['tint'] / 100 * 0.2
rgb = lin_to_srgb(lin)

# --- highlights / shadows on a blurred luminance mask ---------------------
L = luma(rgb)
Lb = blur(L, 24)
gain_s = 1 + (P['shadows'] / 100) * 0.9 * (1 - Lb) ** 3
gain_h = 1 + (P['highlights'] / 100) * 0.4 * smoothstep(0.5, 1.0, Lb)
rgb = rgb * (gain_s * gain_h)[..., None]

# --- whites / blacks (end points) -----------------------------------------
bp = -P['blacks'] / 100 * 0.12          # blacks -8 -> black point up = deeper
wp = 1 - P['whites'] / 100 * 0.25       # whites +8 -> white point down = brighter
rgb = (rgb - bp) / (wp - bp)

# --- dehaze: lift out a small veil, add a touch of saturation -------------
veil = P['dehaze'] / 100 * 0.35
rgb = (rgb - veil) / (1 - veil)

# --- contrast: S-curve blend ----------------------------------------------
x = np.clip(rgb, 0, 1)
s_curve = x * x * (3 - 2 * x)
rgb = x + (s_curve - x) * (P['contrast'] / 100) * 2

# --- clarity (large radius) and texture (small radius) on luminance -------
L = np.clip(luma(np.clip(rgb, 0, 1)), 0, 1)
mid = 1 - np.abs(2 * L - 1)  # strongest in mid-tones, like Lightroom
detail = (L - blur(L, 20)) * (P['clarity'] / 100) * 4 + (L - blur(L, 2.5)) * (P['texture'] / 100) * 3
rgb = rgb + (detail * mid)[..., None]

# --- vibrance and saturation, around luminance ----------------------------
rgb = np.clip(rgb, 0, 1)
L = luma(rgb)[..., None]
chroma = rgb.max(axis=-1, keepdims=True) - rgb.min(axis=-1, keepdims=True)
vib = 1 + (P['vibrance'] / 100) * (1 - np.clip(chroma * 1.5, 0, 1))  # less-saturated get more
sat = 1 + P['saturation'] / 100 + P['dehaze'] / 100 * 0.5
rgb = L + (rgb - L) * vib * sat

out = Image.fromarray((np.clip(rgb, 0, 1) * 255 + 0.5).astype(np.uint8))
out.save(DST, quality=92, subsampling=0, optimize=True)

# Side-by-side comparison for review (not shipped).
before = Image.open(SRC).convert('RGB')
w, h = before.size
cmp = Image.new('RGB', (w * 2 + 20, h), 'white')
cmp.paste(before, (0, 0))
cmp.paste(out, (w + 20, 0))
cmp.thumbnail((1800, 1800))
cmp.save(CMP, quality=85)
print('ok', out.size)
