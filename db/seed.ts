import { db } from "@db/index";
import { recipe, ingredients, list } from "@db/schema";
import { count } from "drizzle-orm";

import Fraction from "fraction.js";
import { Units } from "@lib/types";
import { reset } from "drizzle-seed";

async function generateRecipes(number: number) {
  function genEntries(number: number) {
    return [...Array(number)].map(() => ({
      title:
        "generated Test Recipe value " +
        (Math.floor(Math.random() * 60) as number),
      author: "Moxie",
      description: "",
      body: "# this is a header \ni can put whatever",
      liked: false,
      image: "/cigarettes.png",
      imageAlt: "500 cigarretes",
    }));
  }

  const generated = genEntries(number);
  await db.insert(recipe).values(generated);
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

  const counted = (await db.select({ count: count() }).from(recipe))[0].count;

  for (let index = 1; index < counted; index++) {
    await db.insert(ingredients).values(genIngredients(index));
  }
}

// https://astro.build/db/seed
export default async function seed() {
  await reset(db, { recipe, ingredients, list });
  await generateRecipes(5);
  await generateIngredients();

  /*
  await db.insert(list).values([
    {
      name: "test list 1",
      description: "this is test list 1",
      image: "/doge.png",
      imageAlt: "my friends dog pepper",
      recipes: 1,
    },
    {
      name: "test list 2",

      image: "/doge.png",
      imageAlt: "my friends dog pepper",
    },
    {
      name: "test list 3",
      description: "this is test list 3",
      image: "/doge.png",
      imageAlt: "my friends dog pepper",
    },
    {
      name: "test list 4",

      description: "this is test list 4",
      image: "/doge.png",
      imageAlt: "my friends dog pepper",
    },
    {
      name: "test list 5",

      description: "this is test list 5",
      image: "/doge.png",
      imageAlt: "my friends dog pepper",
    },
  ]); */
}
