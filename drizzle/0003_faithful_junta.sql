ALTER TABLE "Recipe" ALTER COLUMN "author" SET DEFAULT 'No author yet';--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "author" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "body" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "body" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "image" SET DEFAULT '/default.png';--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "imageAlt" SET DEFAULT 'default image';--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "imageAlt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "liked" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "totalViews" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "totalViews" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "recipe_title_index" ON "Recipe" USING gin (to_tsvector('english', "title"));--> statement-breakpoint
CREATE INDEX "recipe_description_index" ON "Recipe" USING gin (to_tsvector('english', "description"));--> statement-breakpoint
CREATE INDEX "recipe_body_index" ON "Recipe" USING gin (to_tsvector('english', "body"));--> statement-breakpoint
CREATE INDEX "recipe_author_index" ON "Recipe" USING gin (to_tsvector('english', "author"));