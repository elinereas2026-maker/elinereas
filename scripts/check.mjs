import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML ids');
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const url = match[1];
  if (url.startsWith('#')) assert(ids.includes(url.slice(1)), `Missing anchor: ${url}`);
  else if (!/^https?:/.test(url)) await access(path.join(root, url));
}
const script = await readFile(path.join(root, 'app.js'), 'utf8');
new vm.Script(script);
for (const match of script.matchAll(/image: '([^']+)'/g)) await access(path.join(root, 'assets', match[1]));
assert.equal((script.match(/image: '/g) || []).length, 7, 'Expected seven photographs');
assert(html.includes('lang="es"'), 'Spanish document language is required');
console.log('OK: links, anchors, seven gallery photographs, document language, and JavaScript syntax.');
