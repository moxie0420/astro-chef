import { db } from "astro:db";
import { asDrizzleTable } from "@astrojs/db/utils";
import { Recipes, ingredient } from "./config";

// https://astro.build/db/seed
export default async function seed() {
  const typedRecipes = asDrizzleTable("Recipes", Recipes);
  // TODO
  await db.insert(typedRecipes).values([
    {
      title: "Example",
      keywords: "Example",
      body: "# Header \n not a header \n\n ![alt](https://picsum.photos/200)",
    },
  ]);
}
