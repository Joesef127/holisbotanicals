import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { admins, packages, testimonials } from './db/schema';
import { eq } from 'drizzle-orm';

const PACKAGES_SEED = [
  {
    id: 'starter',
    productId: 'prostanone',
    name: 'Starter Pack',
    containers: 1,
    price: 15000,
    originalPrice: 15000,
    description: '1 Pack · 20 Days Supply',
    savingsText: null,
    deliveryText: 'Free delivery within Lagos (except Badagry & Epe)',
    usageNote: 'For best results, use consistently for at least 2 months',
    badge: null,
  },
  {
    id: 'trial-boost',
    productId: 'prostanone',
    name: 'Trial Boost',
    containers: 2,
    price: 25000,
    originalPrice: 30000,
    description: '2 Packs · 40 Days Supply',
    savingsText: 'Save ₦5,000',
    deliveryText: 'Free delivery within Lagos (except Badagry & Epe)',
    usageNote: 'A strong starting point toward visible improvement',
    badge: null,
  },
  {
    id: 'most-valuable',
    productId: 'prostanone',
    name: 'Most Valuable Package',
    containers: 3,
    price: 39000,
    originalPrice: 45000,
    description: '3 Packs · 2 Full Months',
    savingsText: 'Save ₦6,000',
    deliveryText: 'Free delivery within Lagos (except Badagry & Epe)',
    usageNote: 'Full consistency for noticeable improvement',
    badge: 'RECOMMENDED',
  },
  {
    id: 'consistency',
    productId: 'prostanone',
    name: 'Consistency Pack',
    containers: 4,
    price: 52000,
    originalPrice: 60000,
    description: '4 Packs · ~3 Months Supply',
    savingsText: 'Save ₦8,000',
    deliveryText: 'Free delivery within Lagos (except Badagry & Epe)',
    usageNote: 'For sustained and stronger results',
    badge: null,
  },
  {
    id: 'performance',
    productId: 'prostanone',
    name: 'Performance Pack',
    containers: 5,
    price: 65000,
    originalPrice: 75000,
    description: '5 Packs · ~4 Months Supply',
    savingsText: 'Save ₦10,000',
    deliveryText: 'Free delivery within Lagos (except Badagry & Epe)',
    usageNote: 'For long-term support and confidence',
    badge: null,
  },
  {
    id: 'loyalty',
    productId: 'prostanone',
    name: 'Loyalty Pack',
    containers: 9,
    price: 115000,
    originalPrice: 135000,
    description: '9 Packs · 6 Full Months',
    savingsText: 'Save ₦20,000',
    deliveryText: 'Free delivery within Lagos (except Badagry & Epe)',
    usageNote: 'Deep, long-term results · Best value per pack',
    badge: 'BEST VALUE',
  },
];

const MENOSET_PACKAGES_SEED = [
  {
    id: 'menoset-starter',
    productId: 'menoset',
    name: 'Menoset Starter',
    containers: 1,
    price: 15000,
    originalPrice: 15000,
    description: '1 Pack · 30 Days Supply',
    savingsText: null,
    deliveryText: 'Nationwide delivery available',
    usageNote: '1 tablet twice daily, following the product label.',
    badge: null,
  },
  {
    id: 'menoset-essentials',
    productId: 'menoset',
    name: 'Menoset Essentials',
    containers: 3,
    price: 40000,
    originalPrice: 45000,
    description: '3 Packs · 90 Days Supply',
    savingsText: 'Save ₦5,000',
    deliveryText: 'Nationwide delivery available',
    usageNote: 'A convenient three-month supply for a consistent routine.',
    badge: null,
  },
  {
    id: 'menoset-wellness',
    productId: 'menoset',
    name: 'Menoset Wellness Bundle',
    containers: 6,
    price: 77000,
    originalPrice: 90000,
    description: '6 Packs · 180 Days Supply',
    savingsText: 'Save ₦13,000',
    deliveryText: 'Nationwide delivery available',
    usageNote: 'A convenient longer supply for an established routine.',
    badge: 'MOST POPULAR',
  },
  {
    id: 'menoset-transformation',
    productId: 'menoset',
    name: 'Menoset Transformation Pack',
    containers: 12,
    price: 160000,
    originalPrice: 180000,
    description: '12 Packs · 360 Days Supply',
    savingsText: 'Save ₦20,000',
    deliveryText: 'Nationwide delivery available',
    usageNote: 'A value and convenience option for fewer reorders.',
    badge: 'BEST VALUE',
  },
];

const TESTIMONIALS_SEED = [
  {
    seedId: 'prostanone-chidi-a',
    productId: 'prostanone',
    name: 'Chidi A.',
    age: 52,
    location: 'Abuja',
    text: 'I was waking up 4 times every night. After 6 weeks with Prostanone, I sleep through the night. My doctor is impressed.',
    rating: 5,
  },
  {
    seedId: 'prostanone-emeka-o',
    productId: 'prostanone',
    name: 'Emeka O.',
    age: 48,
    location: 'Lagos',
    text: 'The weak flow was embarrassing. Now I feel like I\'m in my 30s again. No side effects at all.',
    rating: 5,
  },
  {
    seedId: 'prostanone-adekunle-t',
    productId: 'prostanone',
    name: 'Adekunle T.',
    age: 55,
    location: 'Ibadan',
    text: 'I tried everything. Prostanone is the only supplement that actually worked. NAFDAC approval gave me confidence.',
    rating: 5,
  },
  {
    seedId: 'prostanone-tunde-b',
    productId: 'prostanone',
    name: 'Tunde B.',
    age: 61,
    location: 'Port Harcourt',
    text: 'After 8 weeks, my urgency is gone. I can travel without worrying about finding a toilet.',
    rating: 5,
  },
  {
    seedId: 'prostanone-ibrahim-k',
    productId: 'prostanone',
    name: 'Ibrahim K.',
    age: 49,
    location: 'Kano',
    text: 'My urologist recommended natural supplements first. Prostanone delivered results in 4 weeks.',
    rating: 5,
  },
  {
    seedId: 'prostanone-miss-abiodun',
    productId: 'prostanone',
    name: 'Miss Abiodun',
    age: null,
    location: null,
    text: 'The drug is a wonder drug!!! PSA went from 48 to 8.7, and volume shrunk from 225cc to 72cc... that was a miracle... my dad is super happy about the result.',
    rating: 5,
  },
  {
    seedId: 'prostanone-mr-olu',
    productId: 'prostanone',
    name: 'Mr Olu',
    age: null,
    location: null,
    text: 'I was on catheter for months used prostanone for one month and was discharged from the hospital, after using it...',
    rating: 5,
  },
  {
    seedId: 'prostanone-anonymous-patient',
    productId: 'prostanone',
    name: 'Anonymous Patient',
    age: null,
    location: 'Ebonyi',
    text: 'Good evening sir. I was introduced to PROSTANONE herbal capsules but unfortunately when I saw the efficacy of the product I decided to buy on my own. I searched and discovered it was marketed by HOLIS BOTANICAL GARDEN. I am a prostate enlargement patient looking for direct outlets to buy it in Lagos or Ebonyi State.',
    rating: 5,
  },
];

const MENOSET_TESTIMONIALS_SEED = [
  {
    seedId: 'menoset-amina-b',
    productId: 'menoset',
    name: 'Amina B.',
    age: null,
    location: 'Lagos',
    text: 'Adding Menoset to my routine felt simple and manageable while I paid closer attention to my wellbeing. The heat spikes are much less overwhelming now.',
    rating: 5,
  },
  {
    seedId: 'menoset-ifeoma-o',
    productId: 'menoset',
    name: 'Ifeoma O.',
    age: null,
    location: 'Abuja',
    text: 'The daily routine fits easily into my schedule, and the product information helped me make an informed choice. I feel much more even-tempered throughout the day.',
    rating: 5,
  },
  {
    seedId: 'menoset-tomi-a',
    productId: 'menoset',
    name: 'Tomi A.',
    age: null,
    location: 'Ibadan',
    text: 'I appreciated having a non-hormonal herbal option to consider as my needs changed. My menstrual cycles have felt substantially more predictable.',
    rating: 5,
  },
  {
    seedId: 'menoset-ngozi-e',
    productId: 'menoset',
    name: 'Ngozi E.',
    age: null,
    location: 'Enugu',
    text: 'Sleeping without waking up drenched in night sweat has been the greatest blessing. Menoset has earned a permanent spot on my bedside table.',
    rating: 5,
  },
  {
    seedId: 'menoset-folake-m',
    productId: 'menoset',
    name: 'Folake M.',
    age: null,
    location: 'Port Harcourt',
    text: 'As someone who prefers clean herbal botanicals over synthetic drugs, the ingredient transparency of Black Cohosh and Dong Quai gave me absolute confidence.',
    rating: 5,
  },
  {
    seedId: 'menoset-zainab-k',
    productId: 'menoset',
    name: 'Zainab K.',
    age: null,
    location: 'Kaduna',
    text: 'The cramping and unexpected heavy days were exhausting. Following the simple 1 tablet twice daily routine helped bring a sense of regularity back to my cycle.',
    rating: 5,
  },
];

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is not set in .env');
    process.exit(1);
  }
  if (!adminEmail || !adminPassword) {
    console.error('ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('Seeding testimonials...');
  const allTestimonials = [...TESTIMONIALS_SEED, ...MENOSET_TESTIMONIALS_SEED];
  for (const t of allTestimonials) {
    await db
      .insert(testimonials)
      .values(t)
      .onConflictDoNothing({ target: testimonials.seedId });
  }
  console.log(`Seeded ${allTestimonials.length} testimonials.`);

  console.log('Seeding packages...');
  const allPackages = [...PACKAGES_SEED, ...MENOSET_PACKAGES_SEED];
  for (const pkg of allPackages) {
    await db
      .insert(packages)
      .values(pkg)
      .onConflictDoNothing();
  }
  console.log(`Seeded ${allPackages.length} packages.`);

  console.log('Seeding admin account...');
  const existing = await db.select().from(admins).where(eq(admins.email, adminEmail));
  if (existing.length > 0) {
    console.log(`Admin ${adminEmail} already exists — skipping.`);
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await db.insert(admins).values({ email: adminEmail, passwordHash });
    console.log(`Admin ${adminEmail} created.`);
  }

  console.log('Done.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
