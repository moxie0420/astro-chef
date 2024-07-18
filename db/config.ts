import { defineDb, defineTable, column } from "astro:db";

export const ingredient = defineTable({
  columns: {
    Id: column.number({ primaryKey: true }),
    Name: column.text(),
    amount: column.number(),
    unit: column.text(),
  },
});

export const Recipes = defineTable({
  columns: {
    title: column.text({ primaryKey: true, unique: true }),
    author: column.text({ optional: true }),
    keywords: column.text(),
    ingredients: column.number({
      references: () => ingredient.columns.Id,
      optional: true,
    }),
    body: column.text({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Recipes, ingredient },
});
