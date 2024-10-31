import { defineDb, defineTable, column } from 'astro:db';

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
]

const Ingredient = defineTable({
  columns: {
    recipeId: column.number({ references: () => Recipe.columns.id}),
    name: column.text(),
    amount: column.text(),
    unit: column.text(),
  }
});

const Recipe = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    author: column.text(),
    created: column.date(),
    edited: column.date(),
    prepTime: column.number(),
    cookTime: column.number(),
    body: column.text(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {Recipe, Ingredient}
});
