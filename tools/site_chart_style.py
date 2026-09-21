"""
Matplotlib style matching the site's design tokens, so a chart exported from
your own data looks like it belongs on the page instead of like a screenshot
of somebody else's notebook.

Not part of the Astro build. Import it in whatever script produces a figure:

    from tools.site_chart_style import use_site_style, SIGNAL, INK
    use_site_style("light")
    ...
    fig.savefig("light.svg", format="svg", transparent=True)
    use_site_style("dark")
    ...
    fig.savefig("dark.svg", format="svg", transparent=True)

Why two exports: an SVG carries baked colours, so one file cannot follow
`prefers-color-scheme` the way the inline-SVG diagrams do. Ship both and pick
per scheme:

    <picture>
      <source srcset="/fig/dark.svg" media="(prefers-color-scheme: dark)" />
      <img src="/fig/light.svg" alt="..." />
    </picture>

Values are copied from src/styles/global.css. If a token changes there, change
it here too.
"""

import matplotlib as mpl

# --- tokens, mirrored from global.css -------------------------------------

LIGHT = {
    "paper": "#fbfaf8",
    "ink": "#17191c",
    "ink_muted": "#5f636a",
    "rule": "#e2e0da",
    "accent": "#0d5c56",
    "signal": "#9c4712",
}

DARK = {
    "paper": "#101215",
    "ink": "#e9e7e2",
    "ink_muted": "#aab0b8",
    "rule": "#272b31",
    "accent": "#52c2b1",
    "signal": "#e0904f",
}

INK = LIGHT["ink"]
ACCENT = LIGHT["accent"]
SIGNAL = LIGHT["signal"]

# Order matters: accent first because most figures compare two series, and the
# second one is the thing that went wrong. Never encode a quantity in hue.
SERIES_LIGHT = [LIGHT["accent"], LIGHT["signal"], LIGHT["ink_muted"], "#3f6f8f"]
SERIES_DARK = [DARK["accent"], DARK["signal"], DARK["ink_muted"], "#8fb6cf"]


def use_site_style(scheme: str = "light") -> dict:
    """Apply the site's chart style. Returns the token dict for that scheme."""
    if scheme not in ("light", "dark"):
        raise ValueError("scheme must be 'light' or 'dark'")
    t = LIGHT if scheme == "light" else DARK
    series = SERIES_LIGHT if scheme == "light" else SERIES_DARK

    mpl.rcParams.update(
        {
            # Transparent so the figure sits on the page's own surface rather
            # than punching a coloured rectangle into it.
            "figure.facecolor": "none",
            "axes.facecolor": "none",
            "savefig.facecolor": "none",
            "savefig.transparent": True,
            "savefig.bbox": "tight",
            "svg.fonttype": "none",  # keep text as text, not outlines
            # Type: the site sets everything in IBM Plex.
            "font.family": ["IBM Plex Sans", "DejaVu Sans"],
            "font.size": 11,
            "axes.titlesize": 12,
            "axes.labelsize": 11,
            "xtick.labelsize": 10,
            "ytick.labelsize": 10,
            # Chrome recedes: two spines, thin rules, no box.
            "axes.edgecolor": t["rule"],
            "axes.linewidth": 0.8,
            "axes.spines.top": False,
            "axes.spines.right": False,
            "axes.grid": True,
            "grid.color": t["rule"],
            "grid.linewidth": 0.6,
            "grid.alpha": 1.0,
            "axes.labelcolor": t["ink_muted"],
            "axes.titlecolor": t["ink"],
            "text.color": t["ink"],
            "xtick.color": t["ink_muted"],
            "ytick.color": t["ink_muted"],
            "xtick.direction": "out",
            "ytick.direction": "out",
            "lines.linewidth": 1.6,
            "lines.solid_capstyle": "round",
            "axes.prop_cycle": mpl.cycler(color=series),
            # A legend inside a box is a second frame competing with the first.
            "legend.frameon": False,
            "legend.fontsize": 10,
            "legend.labelcolor": t["ink_muted"],
        }
    )
    return t


def annotate_series(ax, label, xy, color=None, scheme="light"):
    """Label a line where it is, instead of in a legend the reader has to
    cross-reference. Cheaper for the reader than any legend."""
    t = LIGHT if scheme == "light" else DARK
    ax.annotate(
        label,
        xy=xy,
        xytext=(6, 0),
        textcoords="offset points",
        va="center",
        color=color or t["ink"],
        fontfamily=["IBM Plex Mono", "DejaVu Sans Mono"],
        fontsize=10,
    )
