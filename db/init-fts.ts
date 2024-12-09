// fts based on https://github.com/delucis/astro-db-fts

import { db, Recipe, sql } from "astro:db";

export default async function initFts() {
  // Clean up any existing table if it exists.
  await db.run(sql`DROP TABLE IF EXISTS Recipes`);
  // Create virtual full-text search table.
  await db.run(
    sql`CREATE VIRTUAL TABLE Recipes USING FTS5(
				title,
        author,
        description,
				body,
        image,
        imageAlt,
        prepTime,
        cookTime
			);`,
  );
  // Insert content into the database.
  await db.run(
    sql`INSERT INTO Recipes (title,author,description,body,image,imageAlt,prepTime,cookTime)
    SELECT title,author,description,body,image,imageAlt,prepTime,cookTime FROM ${Recipe};`,
  );
}
