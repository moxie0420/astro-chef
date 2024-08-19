import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const Units = [
  "teaspoon",
  "tablespoon",
  "cup",
  "ounce",
  "fluid cup",
  "fluid ounce",
  "pint",
  "quart",
  "gallon",
  "kilograms",
  "grams",
  "miligram",
];

export const ingredients = sqliteTable("ingredients", {
  Id: integer("Id").primaryKey(),
  Recipe: integer("Recipe"),
  Name: text("Title"),
  Amount: real("Amount"),
  Unit: text("Unit", {
    enum: [
      "teaspoon",
      "tablespoon",
      "cup",
      "ounce",
      "fluid cup",
      "fluid ounce",
      "pint",
      "quart",
      "gallon",
      "kilograms",
      "grams",
      "miligram",
    ],
  }),
});

export const recipes = sqliteTable("recipes", {
  Id: integer("Id").primaryKey(),
  Title: text("Title"),
  Body: text("Body"),
  Ingredient_ids: text("Ingredient_ids", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  PrepTime: integer("PrepTime"),
  CookTime: integer("CookTime"),
});
