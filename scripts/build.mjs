import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const icon = manifest.icon;
if (!icon) {
  throw new Error('manifest.json must define an "icon" field');
}

mkdirSync(dist, { recursive: true });
copyFileSync(join(root, 'manifest.json'), join(dist, 'manifest.json'));
copyFileSync(join(src, icon), join(dist, icon));

const { build } = await import('esbuild');

await build({
  entryPoints: [join(src, 'index.ts')],
  outfile: join(dist, 'index.js'),
  bundle: true,
  platform: 'neutral',
  format: 'iife',
});
copyFileSync(join(src, 'index.html'), join(dist, 'index.html'));
copyFileSync(join(src, 'style.css'), join(dist, 'style.css'));

await build({
  entryPoints: [join(src, 'app.ts')],
  outfile: join(dist, 'app.js'),
  bundle: true,
  platform: 'browser',
  format: 'iife',
});

