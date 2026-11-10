import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Build-time check for optional files in /public (headshot, covers, screenshots, artefact PDFs).
 * Missing files fall back to placeholders instead of rendering broken images or links.
 */
export function publicFile(rel: string): string | null {
  const clean = rel.replace(/^\//, '');
  return fs.existsSync(path.join(process.cwd(), 'public', clean)) ? `/${clean}` : null;
}

/** First existing file among a few extensions, e.g. images/work/quantdesk.{webp,png,jpg}. */
export function publicImage(base: string): string | null {
  for (const ext of ['webp', 'png', 'jpg', 'jpeg']) {
    const hit = publicFile(`${base}.${ext}`);
    if (hit) return hit;
  }
  return null;
}
