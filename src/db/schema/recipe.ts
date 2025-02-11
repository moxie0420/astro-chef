import { eq, relations, sql } from "drizzle-orm";
import type { PgSelect } from "drizzle-orm/pg-core";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ingredients } from "./ingredients";

export function recipeSearch<T extends PgSelect>(qb: T, search: string) {
  return qb.where(
    sql`to_tsvector('english', ${recipe.title}) @@ to_tsquery('english', ${search} || ':*')`,
  );
}

export function filterByLiked<T extends PgSelect>(qb: T, type: typeof recipe) {
  return qb.where(eq(type.liked, true));
}

export function sortBy<T extends PgSelect>(
  qb: T,
  by: "random" | "popular" | "by-id" | "title",
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
  }
}

export const recipe = pgTable("Recipe", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar({ length: 255 }).default("No title yet").notNull(),
  author: varchar({ length: 255 }).default("No author yet").notNull(),
  created: timestamp().defaultNow(),
  edited: timestamp().defaultNow(),
  prepTime: varchar({ length: 255 }).default("").notNull(),
  cookTime: varchar({ length: 255 }).default("").notNull(),
  description: varchar({ length: 255 }).default("No description yet").notNull(),
  body: text().default("").notNull(),
  image: varchar({ length: 255 }).default("/default.png").notNull(),
  imageAlt: varchar({ length: 255 }).default("default image").notNull(),
  liked: boolean().default(false).notNull(),
  totalViews: integer().default(0).notNull(),
});

export const recipeRelations = relations(recipe, ({ many }) => ({
  ingredients: many(ingredients),
}));
