ALTER TABLE "Recipe" ADD COLUMN "prepTimeOld" varchar(255);--> statement-breakpoint
ALTER TABLE "Recipe" ADD COLUMN "cookTimeOld" varchar(255);--> statement-breakpoint
CREATE INDEX "search_index" ON "Recipe" USING gin ((
        setweight(to_tsvector('english', "title"), 'A') ||
        setweight(to_tsvector('english', "description"), 'B') ||
        setweight(to_tsvector('english', "body"), 'B') ||
        setweight(to_tsvector('english', "author"), 'A')
      ));