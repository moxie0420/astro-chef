import { defineDb, defineTable, column } from "astro:db";

export const ingredient = defineTable({
  columns: {
    Id: column.number({ primaryKey: true }),
    recipeId: column.number({ references: () => Recipes.columns.id }),
    Name: column.text(),
    amount: column.number(),
    unit: column.text(),
  },
});

export const Recipes = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    title: column.text({ unique: true }),
    author: column.text({ optional: true }),
    keywords: column.text(),
    body: column.text({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Recipes, ingredient },
});
