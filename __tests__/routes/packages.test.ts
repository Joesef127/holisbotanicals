import { describe, it, expect, vi, beforeEach } from 'vitest';

process.env.JWT_SECRET = 'test-secret-key-12345';

vi.mock('../../server/middleware/auth', () => ({
  requireAdmin: async (c: any, next: any) => next(),
}));

const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();

vi.mock('../../server/db', () => ({
  db: {
    select: () => mockSelect(),
    insert: (table: any) => mockInsert(table),
    update: (table: any) => mockUpdate(table),
    delete: (table: any) => mockDelete(table),
  },
}));

import packagesRoute from '../../server/routes/packages';
import menosetPackagesRoute from '../../server/routes/menosetPackages';
import prostanonePackagesRoute from '../../server/routes/prostanonePackages';

describe('Package Routes Validation and Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('packagesRoute POST /', () => {
    it('should reject non-numeric price', async () => {
      const res = await packagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Pkg', price: '15000' }),
      });
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Price is required');
    });

    it('should reject negative price', async () => {
      const res = await packagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Pkg', price: -500 }),
      });
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe('Price is required');
    });

    it('should allow price 0', async () => {
      mockInsert.mockReturnValueOnce({
        values: () => ({
          returning: () => Promise.resolve([{ id: 'test-id', name: 'Free Trial', price: 0, description: '' }]),
        }),
      });

      const res = await packagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Free Trial', price: 0 }),
      });
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.price).toBe(0);
    });

    it('should reject invalid client-supplied package ID (too long or invalid characters)', async () => {
      const resTooLong = await packagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'a'.repeat(65),
          name: 'Test Pkg',
          price: 1000,
        }),
      });
      expect(resTooLong.status).toBe(400);
      expect((await resTooLong.json()).error).toBe('Invalid package ID');

      const resBadChars = await packagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'invalid id with spaces!',
          name: 'Test Pkg',
          price: 1000,
        }),
      });
      expect(resBadChars.status).toBe(400);
      expect((await resBadChars.json()).error).toBe('Invalid package ID');
    });

    it('should return 409 conflict when duplicate primary key error occurs', async () => {
      mockInsert.mockReturnValueOnce({
        values: () => ({
          returning: () => Promise.reject({ code: '23505', message: 'duplicate key value violates unique constraint' }),
        }),
      });

      const res = await packagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'existing-id', name: 'Test Pkg', price: 1000 }),
      });
      expect(res.status).toBe(409);
      expect((await res.json()).error).toBe('Package ID already exists');
    });
  });

  describe('packagesRoute PUT /:id', () => {
    it('should reject null name with 400', async () => {
      const res = await packagesRoute.request('/test-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: null }),
      });
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('Package name is required');
    });

    it('should reject null description with 400', async () => {
      const res = await packagesRoute.request('/test-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: null }),
      });
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('Description must be a string');
    });

    it('should route update to prostanonePackages when productId is prostanone', async () => {
      mockUpdate.mockReturnValueOnce({
        set: () => ({
          where: () => ({
            returning: () => Promise.resolve([{ id: 'prostanone-pkg', name: 'Updated', price: 20000 }]),
          }),
        }),
      });

      const res = await packagesRoute.request('/prostanone-pkg', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 'prostanone', name: 'Updated' }),
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.productId).toBe('prostanone');
    });

    it('should route update to menosetPackages when productId is menoset', async () => {
      mockUpdate.mockReturnValueOnce({
        set: () => ({
          where: () => ({
            returning: () => Promise.resolve([{ id: 'menoset-pkg', name: 'Updated Menoset', price: 30000 }]),
          }),
        }),
      });

      const res = await packagesRoute.request('/menoset-pkg', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 'menoset', name: 'Updated Menoset' }),
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.productId).toBe('menoset');
    });
  });

  describe('packagesRoute DELETE /:id', () => {
    it('should delete from prostanonePackages when productId is prostanone', async () => {
      mockDelete.mockReturnValueOnce({
        where: () => ({
          returning: () => Promise.resolve([{ id: 'pkg-1' }]),
        }),
      });

      const res = await packagesRoute.request('/pkg-1?productId=prostanone', {
        method: 'DELETE',
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.productId).toBe('prostanone');
    });

    it('should delete from menosetPackages when productId is menoset', async () => {
      mockDelete.mockReturnValueOnce({
        where: () => ({
          returning: () => Promise.resolve([{ id: 'pkg-2' }]),
        }),
      });

      const res = await packagesRoute.request('/pkg-2?productId=menoset', {
        method: 'DELETE',
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.productId).toBe('menoset');
    });
  });

  describe('menosetPackagesRoute singular/plural Pack default description', () => {
    it('should use "1 Pack" for 1 container', async () => {
      let insertedValues: any = null;
      mockInsert.mockReturnValueOnce({
        values: (val: any) => {
          insertedValues = val;
          return {
            returning: () => Promise.resolve([{ ...val, productId: 'menoset' }]),
          };
        },
      });

      const res = await menosetPackagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Single Pack', price: 20000, containers: 1 }),
      });
      expect(res.status).toBe(201);
      expect(insertedValues.description).toBe('1 Pack · 30 Days Supply');
    });

    it('should use "3 Packs" for 3 containers', async () => {
      let insertedValues: any = null;
      mockInsert.mockReturnValueOnce({
        values: (val: any) => {
          insertedValues = val;
          return {
            returning: () => Promise.resolve([{ ...val, productId: 'menoset' }]),
          };
        },
      });

      const res = await menosetPackagesRoute.request('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Three Pack Bundle', price: 50000, containers: 3 }),
      });
      expect(res.status).toBe(201);
      expect(insertedValues.description).toBe('3 Packs · 90 Days Supply');
    });

    it('should reject null name in PUT with 400', async () => {
      const res = await menosetPackagesRoute.request('/test-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: null }),
      });
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('Package name is required');
    });

    it('should reject null description in PUT with 400', async () => {
      const res = await menosetPackagesRoute.request('/test-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: null }),
      });
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('Description must be a string');
    });
  });

  describe('prostanonePackagesRoute validation', () => {
    it('should reject null name in PUT with 400', async () => {
      const res = await prostanonePackagesRoute.request('/test-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: null }),
      });
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('Package name is required');
    });

    it('should reject null description in PUT with 400', async () => {
      const res = await prostanonePackagesRoute.request('/test-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: null }),
      });
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('Description must be a string');
    });
  });
});
