ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "seed_id" varchar(100);--> statement-breakpoint
DELETE FROM "testimonials" a USING "testimonials" b
WHERE a.id > b.id
  AND a.product_id = b.product_id
  AND a.name = b.name
  AND a.text = b.text;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-chidi-a' WHERE "name" = 'Chidi A.' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-emeka-o' WHERE "name" = 'Emeka O.' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-adekunle-t' WHERE "name" = 'Adekunle T.' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-tunde-b' WHERE "name" = 'Tunde B.' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-ibrahim-k' WHERE "name" = 'Ibrahim K.' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-miss-abiodun' WHERE "name" = 'Miss Abiodun' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-mr-olu' WHERE "name" = 'Mr Olu' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'prostanone-anonymous-patient' WHERE "name" = 'Anonymous Patient' AND "product_id" = 'prostanone' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'menoset-amina-b' WHERE "name" = 'Amina B.' AND "product_id" = 'menoset' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'menoset-ifeoma-o' WHERE "name" = 'Ifeoma O.' AND "product_id" = 'menoset' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'menoset-tomi-a' WHERE "name" = 'Tomi A.' AND "product_id" = 'menoset' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'menoset-ngozi-e' WHERE "name" = 'Ngozi E.' AND "product_id" = 'menoset' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'menoset-folake-m' WHERE "name" = 'Folake M.' AND "product_id" = 'menoset' AND "seed_id" IS NULL;--> statement-breakpoint
UPDATE "testimonials" SET "seed_id" = 'menoset-zainab-k' WHERE "name" = 'Zainab K.' AND "product_id" = 'menoset' AND "seed_id" IS NULL;--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_seed_id_unique" UNIQUE("seed_id");
EXCEPTION
  WHEN duplicate_table THEN null;
  WHEN duplicate_object THEN null;
END $$;
