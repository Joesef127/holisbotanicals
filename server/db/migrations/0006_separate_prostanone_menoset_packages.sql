CREATE TABLE IF NOT EXISTS "prostanone_packages" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"containers" integer DEFAULT 1 NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"description" varchar(255) NOT NULL,
	"subtitle" varchar(255),
	"savings_text" varchar(100),
	"delivery_text" varchar(255),
	"usage_note" varchar(255),
	"badge" varchar(50),
	"recommended_for" varchar(255),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menoset_packages" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"containers" integer DEFAULT 1 NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"description" varchar(255) DEFAULT '' NOT NULL,
	"savings_text" varchar(100),
	"delivery_text" varchar(255),
	"usage_note" varchar(255),
	"badge" varchar(50),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'packages') THEN
    INSERT INTO "prostanone_packages" ("id", "name", "containers", "price", "original_price", "description", "savings_text", "delivery_text", "usage_note", "badge", "updated_at")
    SELECT "id", "name", "containers", "price", "original_price", COALESCE("description", ''), "savings_text", "delivery_text", "usage_note", "badge", "updated_at"
    FROM "packages"
    WHERE "product_id" = 'prostanone' OR "product_id" IS NULL
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "menoset_packages" ("id", "name", "containers", "price", "original_price", "description", "savings_text", "delivery_text", "usage_note", "badge", "updated_at")
    SELECT "id", "name", "containers", "price", "original_price", COALESCE("description", ''), "savings_text", "delivery_text", "usage_note", "badge", "updated_at"
    FROM "packages"
    WHERE "product_id" = 'menoset'
    ON CONFLICT ("id") DO NOTHING;
  END IF;
END $$;
