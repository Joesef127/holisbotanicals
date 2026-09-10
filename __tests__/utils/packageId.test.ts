import { describe, it, expect } from 'vitest';
import { generatePackageId } from '../../server/utils/packageId';

describe('generatePackageId', () => {
  it('should generate an ID prefixed with prostanone', () => {
    const id = generatePackageId('prostanone', 'Starter Pack');
    expect(id).toMatch(/^prostanone-starter-pack-[a-z0-9]+$/);
    expect(id.length).toBeLessThanOrEqual(64);
  });

  it('should generate an ID prefixed with menoset', () => {
    const id = generatePackageId('menoset', 'Menoset Harmony 30');
    expect(id).toMatch(/^menoset-menoset-harmony-30-[a-z0-9]+$/);
    expect(id.length).toBeLessThanOrEqual(64);
  });

  it('should sanitize special characters in package name', () => {
    const id = generatePackageId('prostanone', 'Special & Best Value (Option #5)!');
    expect(id).toMatch(/^prostanone-special-best-value-opt-[a-z0-9]+$/);
    expect(id).not.toContain('&');
    expect(id).not.toContain('(');
    expect(id).not.toContain('!');
    expect(id.length).toBeLessThanOrEqual(64);
  });

  it('should generate distinct IDs for consecutive calls with same name', () => {
    const id1 = generatePackageId('prostanone', 'Starter');
    const id2 = generatePackageId('prostanone', 'Starter');
    expect(id1).not.toEqual(id2);
  });
});
