import { eq, relations, sql } from "drizzle-orm";
import type { PgSelect } from "drizzle-orm/pg-core";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ingredients } from "./ingredients";

export function recipeSearch<T extends PgSelect>(qb: T, search: string) {
  return qb.where(
    sql`to_tsvector('english', ${recipe.title}) @@ to_tsquery('english', ${search})`,
  );
}

export function filterByLiked<T extends PgSelect>(qb: T, type: typeof recipe) {
  return qb.where(eq(type.liked, true));
}

export function sortBy<T extends PgSelect>(
  qb: T,
  by: "random" | "popular" | "by-id" | "title" | "views",
  type: typeof recipe,
) {
  switch (by) {
    case "by-id":
      return qb.orderBy(type.id);
    case "popular":
      return qb.orderBy(type.totalViews);
    case "random":
      return qb.orderBy(sql`random()`);
    case "title":
      return qb.orderBy(type.title);
    case "views":
      return qb.orderBy(type.totalViews);
  }
}

export const recipe = pgTable(
  "Recipe",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 255 }).default("No author yet").notNull(),
    created: timestamp().defaultNow(),
    edited: timestamp().defaultNow(),
    prepTime: varchar({ length: 255 }).notNull().default("0:00"),
    cookTime: varchar({ length: 255 }).notNull().default("0:00"),
    description: varchar({ length: 255 }).notNull(),
    body: text().default("").notNull(),
    image: varchar({ length: 255 }).default("/default.png").notNull(),
    imageAlt: varchar({ length: 255 }).default("default image").notNull(),
    liked: boolean().default(false).notNull(),
    totalViews: integer().default(0).notNull(),
  },
  (table) => [
    index("recipe_title_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`,
    ),
    index("recipe_description_index").using(
      "gin",
      sql`to_tsvector('english', ${table.description})`,
    ),
    index("recipe_body_index").using(
      "gin",
      sql`to_tsvector('english', ${table.body})`,
    ),
    index("recipe_author_index").using(
      "gin",
      sql`to_tsvector('english', ${table.author})`,
    ),
  ],
);

export const recipeRelations = relations(recipe, ({ many }) => ({
  ingredients: many(ingredients),
}));
