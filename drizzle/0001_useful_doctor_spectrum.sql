ALTER TABLE "Ingredients" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (sequence name "Ingredients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (sequence name "Recipe_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "edited" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Recipe" ALTER COLUMN "liked" SET DEFAULT false;