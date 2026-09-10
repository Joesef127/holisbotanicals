/**
 * Utility to generate clean, collision-free, human-readable IDs for packages.
 * e.g. "prostanone-starter-l8a1b2c" or "menoset-wellness-l8a1b2c"
 */
export function generatePackageId(prefix: 'prostanone' | 'menoset', name: string): string {
  const cleanSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 24);

  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const base = cleanSlug ? `${prefix}-${cleanSlug}` : prefix;
  const id = `${base}-${timestamp}${randomSuffix}`;
  return id.slice(0, 64);
}
