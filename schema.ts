import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const ingredients = sqliteTable("ingredients", {
  Id: integer("Id").primaryKey(),
  Recipe: integer("Recipe"),
  Title: text("Title"),
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
  Ingredient_ids: integer("Ingredient_ids"),
  PrepTime: integer("PrepTime"),
  CookTime: integer("CookTime"),
});
