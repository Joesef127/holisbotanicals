import { Hono } from 'hono';
import { db } from '../db';
import { prostanonePackages } from '../db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '../middleware/auth';
import { generatePackageId } from '../utils/packageId';

const prostanonePackagesRoute = new Hono();

// GET /api/packages/prostanone (or /api/prostanone/packages) — public
prostanonePackagesRoute.get('/', async (c) => {
  const rows = await db
    .select()
    .from(prostanonePackages)
    .orderBy(prostanonePackages.price);

  const mapped = rows.map((r) => ({
    ...r,
    productId: 'prostanone' as const,
  }));

  return c.json(mapped);
});

// POST /api/packages/prostanone — admin only
prostanonePackagesRoute.post('/', requireAdmin, async (c) => {
  const body = await c.req.json<{
    name: string;
    containers?: number;
    price: number;
    originalPrice?: number;
    description?: string;
    subtitle?: string;
    savingsText?: string | null;
    deliveryText?: string;
    usageNote?: string;
    badge?: string | null;
    recommendedFor?: string;
  }>();

  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) return c.json({ error: 'Package name is required' }, 400);
  if (body.price === undefined || body.price === null || typeof body.price !== 'number' || Number.isNaN(body.price) || body.price < 0) {
    return c.json({ error: 'Price is required' }, 400);
  }

  const id = generatePackageId('prostanone', body.name);

  const inserted = await db
    .insert(prostanonePackages)
    .values({
      id,
      name: body.name.trim(),
      containers: body.containers ?? 1,
      price: body.price,
      originalPrice: body.originalPrice ?? null,
      description: body.description?.trim() ?? '',
      subtitle: body.subtitle?.trim() || null,
      savingsText: body.savingsText?.trim() || null,
      deliveryText: body.deliveryText?.trim() ?? '',
      usageNote: body.usageNote?.trim() ?? '',
      badge: body.badge?.trim() || null,
      recommendedFor: body.recommendedFor?.trim() || null,
    })
    .returning();

  return c.json({ ...inserted[0], productId: 'prostanone' }, 201);
});

// PUT /api/packages/prostanone/:id — admin only
prostanonePackagesRoute.put('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);

  const body = await c.req.json<{
    name?: string;
    containers?: number;
    price?: number;
    originalPrice?: number;
    description?: string;
    subtitle?: string;
    savingsText?: string | null;
    deliveryText?: string;
    usageNote?: string;
    badge?: string | null;
    recommendedFor?: string;
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
  if (body.subtitle !== undefined) allowedFields.subtitle = body.subtitle?.trim() || null;
  if (body.savingsText !== undefined) allowedFields.savingsText = body.savingsText?.trim() || null;
  if (body.deliveryText !== undefined) allowedFields.deliveryText = body.deliveryText?.trim() ?? '';
  if (body.usageNote !== undefined) allowedFields.usageNote = body.usageNote?.trim() ?? '';
  if (body.badge !== undefined) allowedFields.badge = body.badge?.trim() || null;
  if (body.recommendedFor !== undefined) allowedFields.recommendedFor = body.recommendedFor?.trim() || null;
  allowedFields.updatedAt = new Date();

  const updated = await db
    .update(prostanonePackages)
    .set(allowedFields)
    .where(eq(prostanonePackages.id, id))
    .returning();

  if (updated.length === 0) {
    return c.json({ error: 'Package not found' }, 404);
  }

  return c.json({ ...updated[0], productId: 'prostanone' });
});

// DELETE /api/packages/prostanone/:id — admin only
prostanonePackagesRoute.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);

  const deleted = await db
    .delete(prostanonePackages)
    .where(eq(prostanonePackages.id, id))
    .returning();

  if (deleted.length === 0) return c.json({ error: 'Package not found' }, 404);
  return c.json({ success: true });
});

export default prostanonePackagesRoute;
