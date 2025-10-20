import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd());
const srcDirs = [
  path.join(root, 'src/assets/work-activities'),
  path.join(root, 'src/assets/images')
];

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'thumbs' || e.name === 'webp' || e.name === 'optimized') continue;
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function needsBuild(src, out) {
  try {
    const [s, o] = await Promise.all([fs.stat(src), fs.stat(out)]);
    return s.mtimeMs > o.mtimeMs;
  } catch {
    return true;
  }
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) return { skipped: true };

  const dir = path.dirname(file);
  const base = path.basename(file, ext);
  const thumbsDir = path.join(dir, 'thumbs');
  const webpDir = path.join(dir, 'webp');
  const thumbOut = path.join(thumbsDir, `${base}.webp`);
  const webpOut = path.join(webpDir, `${base}.webp`);

  await Promise.all([ensureDir(thumbsDir), ensureDir(webpDir)]);

  const tasks = [];
  if (await needsBuild(file, thumbOut)) {
    tasks.push(
      sharp(file)
        .rotate()
        .resize({ width: 480, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(thumbOut)
        .then(() => ({ file, kind: 'thumb' }))
    );
  }
  if (await needsBuild(file, webpOut)) {
    tasks.push(
      sharp(file)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(webpOut)
        .then(() => ({ file, kind: 'webp' }))
    );
  }

  const results = await Promise.all(tasks);
  return { processed: results };
}

function rel(p) {
  return path.relative(root, p).replace(/\\/g, '/');
}

async function main() {
  const files = [];
  for (const dir of srcDirs) {
    try {
      for await (const f of walk(dir)) files.push(f);
    } catch {
      // ignore missing directories
    }
  }
  let count = 0;
  for (const f of files) {
    const res = await processFile(f);
    if (res.processed?.length) {
      for (const r of res.processed) {
        console.log(`optimized(${r.kind}): ${rel(f)}`);
        count++;
      }
    }
  }
  console.log(`Done. Wrote ${count} outputs.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

