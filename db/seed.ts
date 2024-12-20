import { db, Ingredient, Recipe, RecipeList, count } from "astro:db";

import Fraction from "fraction.js";
import { Units } from "@lib/types";

async function generateRecipes(number: number) {
  function genEntries(number: number) {
    return [...Array(number)].map(() => ({
      title:
        "generated Test Recipe value " +
        (Math.floor(Math.random() * 60) as number),
      author: "Moxie",
      body: "# this is a header\ni can put whatever",
      cookTime: (Math.floor(Math.random() * 60) as number) + " Minutes",
      likes: true,
      image: "/cigarettes.png",
    }));
  }

  const generated = genEntries(number);
  await db.insert(Recipe).values(generated);
}

async function generateIngredients() {
  function genIngredients(number: number) {
    const num = new Fraction(Math.random() * 10).simplify(0.01);

    const generated = [...Array(number)].map(() => ({
      recipeId: number,
      name: "random ingredient gooning",
      whole: num.valueOf(),
      fraction: num.toFraction(true),
      unit: Units[Math.floor(Math.random() * Units.length)],
    }));
    return generated;
  }

  const counted = (await db.select({ count: count() }).from(Recipe))[0].count;

  const queries = [];
  for (let index = 1; index < counted; index++) {
    queries.push(db.insert(Ingredient).values(genIngredients(index)));
  }
  await db.batch(queries);
}

// https://astro.build/db/seed
export default async function seed() {
  await generateRecipes(30);
  await generateIngredients();

  await db.insert(RecipeList).values([
    {
      name: "test list 1",
      recipes: "[1, 2, 3]",
      description: "this is test list 1",
    },
    {
      name: "test list 2",
      recipes: "[1, 2, 3]",
      description: "this is test list 2",
    },
    {
      name: "test list 3",
      recipes: "[1, 2, 3]",
      description: "this is test list 3",
    },
    {
      name: "test list 4",
      recipes: "[1, 2, 3]",
      description: "this is test list 4",
    },
    {
      name: "test list 5",
      recipes: "[1, 2, 3]",
      description: "this is test list 5",
    },
  ]);
}
