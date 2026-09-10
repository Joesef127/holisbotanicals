import { Hono } from 'hono';
import { db } from '../db';
import { prostanonePackages, menosetPackages } from '../db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '../middleware/auth';
import prostanonePackagesRoute from './prostanonePackages';
import menosetPackagesRoute from './menosetPackages';
import { generatePackageId } from '../utils/packageId';

const packagesRoute = new Hono();

// Mount dedicated subroutes:
// /api/packages/prostanone -> prostanonePackagesRoute
// /api/packages/menoset -> menosetPackagesRoute
packagesRoute.route('/prostanone', prostanonePackagesRoute);
packagesRoute.route('/menoset', menosetPackagesRoute);

// GET /api/packages — public fallback with strict product isolation
packagesRoute.get('/', async (c) => {
  const productId = c.req.query('productId');

  if (productId === 'menoset') {
    const rows = await db
      .select()
      .from(menosetPackages)
      .orderBy(menosetPackages.price);
    return c.json(rows.map((r) => ({ ...r, description: r.description ?? '', productId: 'menoset' as const })));
  }

  // Default strictly to prostanone packages (never mix)
  const rows = await db
    .select()
    .from(prostanonePackages)
    .orderBy(prostanonePackages.price);
  return c.json(rows.map((r) => ({ ...r, productId: 'prostanone' as const })));
});

// POST /api/packages — admin only fallback
packagesRoute.post('/', requireAdmin, async (c) => {
  const body = await c.req.json<{
    id?: string;
    productId?: string;
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

  const isMenoset = body.productId === 'menoset';
  const prefix = isMenoset ? 'menoset' : 'prostanone';

  let id: string;
  if (body.id !== undefined && body.id !== null) {
    if (typeof body.id !== 'string' || !body.id.trim() || body.id.trim().length > 64 || !/^[a-zA-Z0-9_-]+$/.test(body.id.trim())) {
      return c.json({ error: 'Invalid package ID' }, 400);
    }
    id = body.id.trim();
  } else {
    id = generatePackageId(prefix, body.name);
  }

  try {
    if (isMenoset) {
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
    }

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
  } catch (err: any) {
    if (err?.code === '23505' || String(err?.message || err).includes('unique constraint') || String(err?.message || err).includes('duplicate key')) {
      return c.json({ error: 'Package ID already exists' }, 409);
    }
    return c.json({ error: 'Failed to create package' }, 500);
  }
});

// DELETE /api/packages/:id — admin only
packagesRoute.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);

  let productId = c.req.query('productId');
  if (!productId) {
    try {
      const body = await c.req.json<{ productId?: string }>().catch(() => ({}));
      productId = body?.productId;
    } catch {}
  }

  if (productId === 'prostanone') {
    const deletedPros = await db.delete(prostanonePackages).where(eq(prostanonePackages.id, id)).returning();
    if (deletedPros.length > 0) return c.json({ success: true, productId: 'prostanone' });
    return c.json({ error: 'Package not found' }, 404);
  }

  if (productId === 'menoset') {
    const deletedMeno = await db.delete(menosetPackages).where(eq(menosetPackages.id, id)).returning();
    if (deletedMeno.length > 0) return c.json({ success: true, productId: 'menoset' });
    return c.json({ error: 'Package not found' }, 404);
  }

  // Try prostanone first
  const deletedPros = await db.delete(prostanonePackages).where(eq(prostanonePackages.id, id)).returning();
  if (deletedPros.length > 0) return c.json({ success: true, productId: 'prostanone' });

  // Try menoset
  const deletedMeno = await db.delete(menosetPackages).where(eq(menosetPackages.id, id)).returning();
  if (deletedMeno.length > 0) return c.json({ success: true, productId: 'menoset' });

  return c.json({ error: 'Package not found' }, 404);
});

// PUT /api/packages/:id — protected
packagesRoute.put('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing id' }, 400);
  const body = await c.req.json<{
    productId?: string;
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

  if (body.name !== undefined) {
    if (body.name === null || typeof body.name !== 'string' || !body.name.trim()) {
      return c.json({ error: 'Package name is required' }, 400);
    }
  }

  if (body.description !== undefined) {
    if (body.description === null || typeof body.description !== 'string') {
      return c.json({ error: 'Description must be a string' }, 400);
    }
  }

  // Try updating prostanone
  const allowedFieldsPros: Record<string, unknown> = {};
  if (body.name !== undefined) allowedFieldsPros.name = body.name.trim();
  if (body.containers !== undefined) allowedFieldsPros.containers = body.containers;
  if (body.price !== undefined) allowedFieldsPros.price = body.price;
  if (body.originalPrice !== undefined) allowedFieldsPros.originalPrice = body.originalPrice;
  if (body.description !== undefined) allowedFieldsPros.description = body.description.trim();
  if (body.subtitle !== undefined) allowedFieldsPros.subtitle = body.subtitle?.trim() || null;
  if (body.savingsText !== undefined) allowedFieldsPros.savingsText = body.savingsText?.trim() || null;
  if (body.deliveryText !== undefined) allowedFieldsPros.deliveryText = body.deliveryText?.trim() ?? '';
  if (body.usageNote !== undefined) allowedFieldsPros.usageNote = body.usageNote?.trim() ?? '';
  if (body.badge !== undefined) allowedFieldsPros.badge = body.badge?.trim() || null;
  if (body.recommendedFor !== undefined) allowedFieldsPros.recommendedFor = body.recommendedFor?.trim() || null;
  allowedFieldsPros.updatedAt = new Date();

  // Try updating menoset
  const allowedFieldsMeno: Record<string, unknown> = {};
  if (body.name !== undefined) allowedFieldsMeno.name = body.name.trim();
  if (body.containers !== undefined) allowedFieldsMeno.containers = body.containers;
  if (body.price !== undefined) allowedFieldsMeno.price = body.price;
  if (body.originalPrice !== undefined) allowedFieldsMeno.originalPrice = body.originalPrice;
  if (body.description !== undefined) allowedFieldsMeno.description = body.description.trim();
  if (body.savingsText !== undefined) allowedFieldsMeno.savingsText = body.savingsText?.trim() || null;
  if (body.deliveryText !== undefined) allowedFieldsMeno.deliveryText = body.deliveryText?.trim() ?? '';
  if (body.usageNote !== undefined) allowedFieldsMeno.usageNote = body.usageNote?.trim() ?? '';
  if (body.badge !== undefined) allowedFieldsMeno.badge = body.badge?.trim() || null;
  allowedFieldsMeno.updatedAt = new Date();

  if (body.productId === 'prostanone') {
    const updatedPros = await db
      .update(prostanonePackages)
      .set(allowedFieldsPros)
      .where(eq(prostanonePackages.id, id))
      .returning();

    if (updatedPros.length > 0) {
      return c.json({ ...updatedPros[0], productId: 'prostanone' });
    }
    return c.json({ error: 'Package not found' }, 404);
  }

  if (body.productId === 'menoset') {
    const updatedMeno = await db
      .update(menosetPackages)
      .set(allowedFieldsMeno)
      .where(eq(menosetPackages.id, id))
      .returning();

    if (updatedMeno.length > 0) {
      return c.json({ ...updatedMeno[0], productId: 'menoset' });
    }
    return c.json({ error: 'Package not found' }, 404);
  }

  const updatedPros = await db
    .update(prostanonePackages)
    .set(allowedFieldsPros)
    .where(eq(prostanonePackages.id, id))
    .returning();

  if (updatedPros.length > 0) {
    return c.json({ ...updatedPros[0], productId: 'prostanone' });
  }

  const updatedMeno = await db
    .update(menosetPackages)
    .set(allowedFieldsMeno)
    .where(eq(menosetPackages.id, id))
    .returning();

  if (updatedMeno.length > 0) {
    return c.json({ ...updatedMeno[0], productId: 'menoset' });
  }

  return c.json({ error: 'Package not found' }, 404);
});

export default packagesRoute;
