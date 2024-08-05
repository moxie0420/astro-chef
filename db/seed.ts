import { db } from "astro:db";
import { asDrizzleTable } from "@astrojs/db/utils";
import { Recipes } from "./config";

// https://astro.build/db/seed
export default async function seed() {
  const typedRecipes = asDrizzleTable("Recipes", Recipes);
  // TODO
  await db.insert(typedRecipes).values([
    {
      id: 0,
      title: "Example",
      keywords: "Example",
      body: "# Header \n not a header \n\n ![alt](https://picsum.photos/200)",
    },
    {
      id: 1,
      title: "Example 2",
      keywords: "Example 2",
      body: "# Header \n not a header \n\n ![alt](https://picsum.photos/200)",
    },
  ]);
}
