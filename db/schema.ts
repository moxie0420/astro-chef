import { relations, sql } from "drizzle-orm";
import {
  integer,
  real,
  pgTable,
  varchar,
  timestamp,
  time,
  text,
  boolean,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

export type selectRecipe = typeof recipe.$inferSelect;
export type selectIngredient = typeof ingredients.$inferSelect;

export const ingredients = pgTable("Ingredients", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  recipeId: integer().notNull(),
  name: varchar({ length: 255 }).notNull(),
  unit: varchar({ length: 255 }).notNull(),
  whole: real().notNull(),
  fraction: varchar({ length: 255 }).notNull(),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipe, {
    fields: [ingredients.recipeId],
    references: [recipe.id],
  }),
}));

export const recipe = pgTable(
  "Recipe",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 255 }).default("No author yet"),
    created: timestamp().defaultNow(),
    edited: timestamp().defaultNow(),
    prepTime: time(),
    cookTime: time(),
    description: varchar({ length: 255 }).notNull(),
    body: text().default(""),
    image: varchar({ length: 255 }).default("/default.png"),
    imageAlt: varchar({ length: 255 }).default("default image"),
    liked: boolean().default(false),
    totalViews: integer().default(0).notNull(),
  },
  (table) => [
    index("recipe_title_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`
    ),
    index("recipe_description_index").using(
      "gin",
      sql`to_tsvector('english', ${table.description})`
    ),
    index("recipe_body_index").using(
      "gin",
      sql`to_tsvector('english', ${table.body})`
    ),
    index("recipe_author_index").using(
      "gin",
      sql`to_tsvector('english', ${table.author})`
    ),
  ]
);

export const recipeRelations = relations(recipe, ({ many }) => ({
  ingredients: many(ingredients),
}));

export const list = pgTable("lists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  imageAlt: varchar({ length: 255 }).notNull(),
  liked: boolean().default(false),
  totalViews: integer().default(0),
  description: varchar({ length: 255 }).notNull(),
  created: timestamp().defaultNow(),
  edited: timestamp(),
});

export const listRelations = relations(list, ({ many }) => ({
  recipes: many(listToRecipes),
}));

export const listToRecipes = pgTable(
  "list_to_recipes",
  {
    listId: integer()
      .notNull()
      .references(() => list.id),
    recipeId: integer()
      .notNull()
      .references(() => recipe.id),
  },
  (t) => [primaryKey({ columns: [t.listId, t.recipeId] })]
);

export const listToRecipesRelations = relations(listToRecipes, ({ one }) => ({
  list: one(list, {
    fields: [listToRecipes.listId],
    references: [list.id],
  }),
  recipe: one(recipe, {
    fields: [listToRecipes.recipeId],
    references: [recipe.id],
  }),
}));
