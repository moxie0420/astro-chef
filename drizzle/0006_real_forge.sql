DROP INDEX "recipe_title_index";--> statement-breakpoint
DROP INDEX "recipe_description_index";--> statement-breakpoint
DROP INDEX "recipe_body_index";--> statement-breakpoint
DROP INDEX "recipe_author_index";--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Recipe" DROP COLUMN "prepTime";--> statement-breakpoint
ALTER TABLE "Recipe" DROP COLUMN "cookTime";