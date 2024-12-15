import { db, Ingredient, Recipe, count } from "astro:db";
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
    const generated = [...Array(number)].map(() => ({
      recipeId: number,
      name: "random ingredient gooning",
      amount: new Fraction(Math.random() * 10).simplify(0.01).toFraction(true),
      unit: Units[Math.floor(Math.random() * Units.length)],
    }));
    return generated;
  }

  const counted = (await db.select({ count: count() }).from(Recipe))[0].count;
  for (let index = 1; index < counted; index++) {
    await db.insert(Ingredient).values(genIngredients(index));
  }
}

// https://astro.build/db/seed
export default async function seed() {
  generateRecipes(30);
  generateIngredients();
}
