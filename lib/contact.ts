export const PREFILL_EVENT = 'contact:prefill';

/** Ask the contact form to prefill its subject (e.g. a resume request). */
export function prefillContact(subject: string) {
  window.dispatchEvent(new CustomEvent<string>(PREFILL_EVENT, { detail: subject }));
}

/**
 * Prefix a /public asset path with the deploy base path (GitHub Pages sub-path).
 * Falls back to Next's own inlined basePath, which is set even when a CI step
 * (actions/configure-pages) injects `basePath` into next.config directly.
 */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || process.env.__NEXT_ROUTER_BASEPATH || ''}${p}`;
