import { mkdir, writeFile } from 'node:fs/promises';

const photos = [
  { name: 'hero', id: 'photo-1571019614242-c5c5dee9f50b' },
  { name: 'mobilnosc', id: 'photo-1540206276207-3af25c08abc4' },
  { name: 'silownia', id: 'photo-1534258936925-c58bed479fcb' },
  { name: 'para', id: 'photo-1648542036561-e1d66a5ae2b1' }
];
const sizes = [640, 1200];

await mkdir('img', { recursive: true });

for (const p of photos) {
  for (const w of sizes) {
    const url = `https://images.unsplash.com/${p.id}?fm=jpg&auto=format&fit=max&w=${w}&q=75`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${p.name} ${w}px: HTTP ${res.status}`);
    const file = `img/${p.name}-${w}.jpg`;
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log('zapisano', file);
  }
}
