DROP INDEX "search_index";--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "prepTime" varchar(255);--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "cookTime" varchar(255);--> statement-breakpoint
ALTER TABLE "Recipe" DROP COLUMN "prepTimeOld";--> statement-breakpoint
ALTER TABLE "Recipe" DROP COLUMN "cookTimeOld";