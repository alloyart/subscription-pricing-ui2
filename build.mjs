import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const dist = join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'src'), { recursive: true });
await cp(join(root, 'index.html'), join(dist, 'index.html'));
await cp(join(root, 'styles.css'), join(dist, 'styles.css'));
await cp(join(root, 'src', 'app.js'), join(dist, 'src', 'app.js'));
await cp(join(root, 'src', 'copy.js'), join(dist, 'src', 'copy.js'));
await writeFile(join(dist, '.nojekyll'), '');
console.log('Built static site to dist/');
