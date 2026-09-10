import { Hono } from 'hono';
import { db } from '../db';
import { menosetPackages } from '../db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '../middleware/auth';
import { generatePackageId } from '../utils/packageId';

const menosetPackagesRoute = new Hono();

// GET /api/packages/menoset (or /api/menoset/packages) — public
menosetPackagesRoute.get('/', async (c) => {
  const rows = await db
    .select()
    .from(menosetPackages)
    .orderBy(menosetPackages.price);

  const mapped = rows.map((r) => ({
    ...r,
    description: r.description ?? '',
    productId: 'menoset' as const,
  }));

  return c.json(mapped);
});

// POST /api/packages/menoset — admin only
menosetPackagesRoute.post('/', requireAdmin, async (c) => {
  const body = await c.req.json<{
    name: string;
    containers?: number; // Packs (1, 3, 6, 12)
    price: number;
    originalPrice?: number;
    description?: string;
    savingsText?: string | null;
    deliveryText?: string;
    usageNote?: string;
    badge?: string | null;
  }>();

  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) return c.json({ error: 'Package name is required' }, 400);
  if (body.price === undefined || body.price === null || typeof body.price !== 'number' || Number.isNaN(body.price) || body.price < 0) {
    return c.json({ error: 'Price is required' }, 400);
  }

  const id = generatePackageId('menoset', body.name);
  const containers = body.containers ?? 1;
  const defaultDesc = `${containers} ${containers === 1 ? 'Pack' : 'Packs'} · ${containers * 30} Days Supply`;

  const inserted = await db
    .insert(menosetPackages)
    .values({
      id,
      name: body.name.trim(),
      containers,
      price: body.price,
      originalPrice: body.originalPrice ?? null,
      description: body.description?.trim() || defaultDesc,
      savingsText: body.savingsText?.trim() || null,
      deliveryText: body.deliveryText?.trim() || 'Nationwide delivery available',
      usageNote: body.usageNote?.trim() || '1 tablet twice daily, following the product label.',
      badge: body.badge?.trim() || null,
    })
    .returning();

  return c.json({ ...inserted[0], productId: 'menoset' }, 201);
});

// PUT /api/packages/menoset/:id — admin only
menosetPackagesRoute.put('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);

  const body = await c.req.json<{
    name?: string;
    containers?: number;
    price?: number;
    originalPrice?: number;
    description?: string;
    savingsText?: string | null;
    deliveryText?: string;
    usageNote?: string;
    badge?: string | null;
  }>();

  const allowedFields: Record<string, unknown> = {};
  if (body.name !== undefined) {
    if (body.name === null || typeof body.name !== 'string' || !body.name.trim()) {
      return c.json({ error: 'Package name is required' }, 400);
    }
    allowedFields.name = body.name.trim();
  }
  if (body.containers !== undefined) allowedFields.containers = body.containers;
  if (body.price !== undefined) allowedFields.price = body.price;
  if (body.originalPrice !== undefined) allowedFields.originalPrice = body.originalPrice;
  if (body.description !== undefined) {
    if (body.description === null || typeof body.description !== 'string') {
      return c.json({ error: 'Description must be a string' }, 400);
    }
    allowedFields.description = body.description.trim();
  }
  if (body.savingsText !== undefined) allowedFields.savingsText = body.savingsText?.trim() || null;
  if (body.deliveryText !== undefined) allowedFields.deliveryText = body.deliveryText?.trim() ?? '';
  if (body.usageNote !== undefined) allowedFields.usageNote = body.usageNote?.trim() ?? '';
  if (body.badge !== undefined) allowedFields.badge = body.badge?.trim() || null;
  allowedFields.updatedAt = new Date();

  const updated = await db
    .update(menosetPackages)
    .set(allowedFields)
    .where(eq(menosetPackages.id, id))
    .returning();

  if (updated.length === 0) {
    return c.json({ error: 'Package not found' }, 404);
  }

  return c.json({ ...updated[0], productId: 'menoset' });
});

// DELETE /api/packages/menoset/:id — admin only
menosetPackagesRoute.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);

  const deleted = await db
    .delete(menosetPackages)
    .where(eq(menosetPackages.id, id))
    .returning();

  if (deleted.length === 0) return c.json({ error: 'Package not found' }, 404);
  return c.json({ success: true });
});

export default menosetPackagesRoute;
