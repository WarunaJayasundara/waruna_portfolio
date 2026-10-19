// Turns the raw photo and project screenshots in assets-src/ into
// responsive WebP files under public/images/, plus the Open Graph card.
// Run with: npm run images
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'assets-src';
const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

// Portrait: crop to a 4:5 frame centred on the subject.
const portrait = sharp(`${SRC}/portrait.jpg`);
const { width: pw, height: ph } = await portrait.metadata();
const cropH = Math.round(pw * 1.25) > ph ? ph : Math.round(pw * 1.25);
const cropTop = Math.max(0, Math.round((ph - cropH) * 0.35));
for (const w of [480, 800]) {
  await sharp(`${SRC}/portrait.jpg`)
    .extract({ left: 0, top: cropTop, width: pw, height: cropH })
    .resize({ width: w })
    .webp({ quality: 78 })
    .toFile(`${OUT}/portrait-${w}.webp`);
}

// Project screenshots (1440×900 captures): 16:10 frames at two widths.
const shots = ['helaiq', 'yash', 'nithi', 'beaver'];
for (const name of shots) {
  for (const w of [720, 1280]) {
    await sharp(`${SRC}/${name}.png`)
      .resize({ width: w })
      .webp({ quality: name === 'beaver' ? 70 : 82 })
      .toFile(`${OUT}/${name}-${w}.webp`);
  }
}

// HelaIQ long landing capture → a cropped "feature grid" detail.
await sharp(`${SRC}/helaiq-tall.png`)
  .extract({ left: 250, top: 1230, width: 940, height: 600 })
  .resize({ width: 940 })
  .webp({ quality: 82 })
  .toFile(`${OUT}/helaiq-features.webp`);

// Open Graph card 1200×630.
const og = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0c0d0f"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="64" y="96" font-family="Consolas, monospace" font-size="20" fill="#c8f04a" letter-spacing="3">SOFTWARE ENGINEER · SRI LANKA</text>
  <text x="64" y="230" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="92" fill="#efebe3" letter-spacing="-3">Waruna</text>
  <text x="64" y="330" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="92" fill="#efebe3" letter-spacing="-3">Jayasundara</text>
  <text x="64" y="410" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#a8a49c">Web systems, business websites and portfolios,</text>
  <text x="64" y="450" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#a8a49c">built to be relied on.</text>
  <g transform="translate(64 520) scale(1.25)"><rect width="64" height="64" rx="14" fill="#121417" stroke="#34383f"/><path d="M9 18 L16.5 40 L24 24 L31.5 40 L39 18" fill="none" stroke="#efebe3" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M49 18 V39 a8.5 8.5 0 0 1 -8.5 8.5 H33" fill="none" stroke="#c8f04a" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></g>
</svg>`);
const ogPortrait = await sharp(`${SRC}/portrait.jpg`)
  .extract({ left: 0, top: cropTop, width: pw, height: cropH })
  .resize({ width: 400, height: 500, fit: 'cover' })
  .toBuffer();
await sharp(og)
  .composite([{ input: ogPortrait, left: 760, top: 65 }])
  .jpeg({ quality: 85 })
  .toFile(`${OUT}/og-card.jpg`);

console.log('images written to', OUT);
