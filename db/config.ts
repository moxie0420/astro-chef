import { defineDb, defineTable, column, NOW } from "astro:db";

const Ingredient = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    recipeId: column.number(),
    name: column.text({ optional: true }),
    amount: column.text({ optional: true }),
    unit: column.text({ optional: true }),
  },
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
    image: column.text({ optional: true }),
    imageAlt: column.text({ optional: true }),
    liked: column.boolean({ optional: true, default: false }),
    totalViews: column.number({ optional: true, default: 0 }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Recipe, Ingredient },
});
