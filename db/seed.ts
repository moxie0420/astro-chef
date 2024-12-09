import { db, Ingredient, Recipe } from "astro:db";
import initFts from "./init-fts";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Recipe).values([
    {
      title: "Test Recipe",
      author: "Moxie",
      body: "# this is a header\ni can put whatever",
      cookTime: "2 Minutes",
    },
    { title: "Test Recipe Number 2", author: "Moxie" },
  ]);

  await db.insert(Ingredient).values([
    {
      recipeId: 1,
      amount: "1/2",
      unit: "cup",
      name: "love",
    },
    {
      recipeId: 1,
      amount: "1/4",
      unit: "cup",
      name: "milk",
    },
    {
      recipeId: 1,
      amount: "1/8",
      unit: "cup",
      name: "butter",
    },
  ]);

  await initFts();
}
