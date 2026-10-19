// Renders cv/cv.html to the downloadable PDF with headless Chrome or Edge.
// Run with: npm run cv   (set CHROME_PATH if Chrome is installed elsewhere)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error('Chrome or Edge not found; set CHROME_PATH.');

const input = pathToFileURL(resolve('cv/cv.html')).href;
const output = resolve('public/Waruna_Jayasundara_CV.pdf');
const profile = mkdtempSync(join(tmpdir(), 'cv-chrome-'));

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  `--user-data-dir=${profile}`,
  '--no-pdf-header-footer',
  `--print-to-pdf=${output}`,
  input,
], { stdio: 'ignore' });

console.log('CV written to', output);
