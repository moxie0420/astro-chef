CREATE TABLE "Ingredients" (
	"id" integer PRIMARY KEY NOT NULL,
	"recipeId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit" varchar(255) NOT NULL,
	"whole" real NOT NULL,
	"fraction" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lists" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lists_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"imageAlt" varchar(255) NOT NULL,
	"liked" boolean DEFAULT false,
	"totalViews" integer DEFAULT 0,
	"description" varchar(255) NOT NULL,
	"created" timestamp DEFAULT now(),
	"edited" timestamp
);
--> statement-breakpoint
CREATE TABLE "list_to_recipes" (
	"listId" integer NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT "list_to_recipes_listId_recipeId_pk" PRIMARY KEY("listId","recipeId")
);
--> statement-breakpoint
CREATE TABLE "Recipe" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"created" timestamp DEFAULT now(),
	"edited" timestamp,
	"prepTime" time,
	"cookTime" time,
	"description" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"image" varchar(255) NOT NULL,
	"imageAlt" varchar(255) NOT NULL,
	"liked" boolean,
	"totalViews" integer
);
--> statement-breakpoint
ALTER TABLE "list_to_recipes" ADD CONSTRAINT "list_to_recipes_listId_lists_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_to_recipes" ADD CONSTRAINT "list_to_recipes_recipeId_Recipe_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE no action ON UPDATE no action;