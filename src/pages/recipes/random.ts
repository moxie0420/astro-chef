import type { APIRoute } from "astro";
import { db } from "@db/index";
import { recipe } from "@db/schema";

export const GET: APIRoute = async ({ redirect }) => {
  const count = await db.$count(recipe);
  const [{ id }] = await db
    .select({ id: recipe.id })
    .from(recipe)
    .orderBy(recipe.id)
    .limit(1)
    .offset(Math.floor(Math.random() * count));

  return redirect("/recipes/by-id/" + id, 307);
};
