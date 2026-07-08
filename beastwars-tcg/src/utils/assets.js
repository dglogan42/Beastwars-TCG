/** Prefix public asset paths with Vite BASE_URL (works on GitHub Pages + local). */
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/';
  const clean = String(path || '').replace(/^\//, '');
  return `${base}${clean}`;
}

/** React Router basename (no trailing slash, empty for root). */
export function routerBasename() {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') return undefined;
  return base.replace(/\/$/, '');
}
