import { defineDb, defineTable, column, NOW } from 'astro:db';

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
    recipeId: column.number(),
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
    created: column.date({ default: NOW }),
    edited: column.date({ default: NOW }),
    prepTime: column.text({ optional: true }),
    cookTime: column.text({ optional: true }),
    description: column.text({ optional: true }),
    body: column.text({ optional: true }),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Recipe, Ingredient }
});
