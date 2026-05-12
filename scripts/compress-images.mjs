// scripts/compress-images.mjs
// Re-compress all public/*.png assets in place using sharp.
// Strategy: keep PNG format (Next.js Image will WebP-ify on the wire),
// but redo encoding with maximum compression effort.
// Skips files that would grow.

import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";

const ROOTS = ["public/npc", "public/realm", "public/worldmap"];

function fmt(n) {
  return (n / 1024).toFixed(0).padStart(5) + " KB";
}

let totalBefore = 0;
let totalAfter = 0;
let kept = 0;
let skipped = 0;

for (const dir of ROOTS) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    continue;
  }
  for (const f of files) {
    if (!f.endsWith(".png")) continue;
    const inPath = path.join(dir, f);
    const tmpPath = inPath + ".tmp";
    const before = (await stat(inPath)).size;
    totalBefore += before;
    try {
      await sharp(inPath)
        .png({
          compressionLevel: 9,
          effort: 10,
          adaptiveFiltering: true,
        })
        .toFile(tmpPath);
      const after = (await stat(tmpPath)).size;
      if (after < before) {
        await rename(tmpPath, inPath);
        totalAfter += after;
        kept++;
        console.log(
          `✓ ${f.padEnd(22)}  ${fmt(before)}  →  ${fmt(after)}  (−${(
            ((before - after) / before) *
            100
          ).toFixed(0)}%)`
        );
      } else {
        await unlink(tmpPath);
        totalAfter += before;
        skipped++;
        console.log(`- ${f.padEnd(22)}  ${fmt(before)}  (skip, would grow)`);
      }
    } catch (err) {
      console.error(`✘ ${f}: ${err.message}`);
      totalAfter += before;
      skipped++;
    }
  }
}

console.log("");
console.log(
  `Total: ${fmt(totalBefore)}  →  ${fmt(totalAfter)}  ` +
    `(${kept} kept, ${skipped} skipped)`
);
