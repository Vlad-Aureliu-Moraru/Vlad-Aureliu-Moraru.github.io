# Project Images

Drop your images into this folder and they will automatically replace the
placeholder art — no code changes needed.

| Location / filename      | Project         | Notes                                                                    |
| ------------------------ | --------------- | ------------------------------------------------------------------------ |
| `PRESSYNC/` (folder)     | PRESSYNC        | All files render as a gallery carousel, in filename order                |
| `MEAI/` (folder)         | MEAI            | All files render as a gallery carousel. `LPRRv01.svg` is the card's accent (not a slide) |
| `fitterz.png`            | FITTERZ         | Single screenshot slot (currently themed SVG placeholder)                |
| `AILIN/` (folder)        | AILIN           | All files render as a gallery carousel, in filename order                |
| `TASKWATCH/` (folder)    | TASKWATCH+      | Gallery carousel of screenshots; `Taskwatch+.svg` is the card's accent (not a slide) |
| `TRAINIUM/` (folder)     | TRAINIUM        | All `.png` screenshots in this folder appear in a gallery carousel, in filename order |
| `MONSTERCLICKER/` (folder) | Monster Clicker | All files render as a gallery carousel (screenshots first, icon last)   |
| `flashwrt.png`           | FLASHWRT        | Single screenshot slot (currently themed SVG placeholder)                |
| `aniwa.png`              | ANIWA           | Single screenshot slot (currently themed SVG placeholder)                |
| `ressync.png`            | RESSYNC         | Single screenshot slot (currently themed SVG placeholder). Renamed from HEALTHBUDDY |
| `LISTIT/` (folder)       | LISTIT          | All files render as a gallery carousel, in filename order                |

For single-slot projects you can also use a folder of screenshots (like
`TRAINIUM/`) if you'd rather show a gallery.

For **folder-based** projects (PRESSYNC, MEAI, AILIN, TASKWATCH, TRAINIUM,
MONSTERCLICKER, LISTIT) the carousel is wired to specific filenames in
`index.html`. To add or reorder slides, edit the `src` attributes there. The
other projects point at a plain filename like `fitterz.png` — drop a file with
that exact name and it appears automatically.

Suggested size: 1280 × 800 (landscape) for the showcase frames.

The name you use matters — it's the `src` the page already points at.

---

**Profile picture** — `pfp.jpg` is used as the avatar in the hero (shown in a
circular crop). Portrait orientation works well; the crop is biased toward the
top of the image (`object-position: 50% 18%` in `style.css`).

