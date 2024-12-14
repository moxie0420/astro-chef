import type { APIRoute } from "astro";
import { count, db, Recipe } from "astro:db";

export const GET: APIRoute = async ({ redirect }) => {
  const [counted] = await db.select({ count: count() }).from(Recipe);
  const [{ id }] = await db
    .select({ id: Recipe.id })
    .from(Recipe)
    .orderBy(Recipe.id)
    .limit(1)
    .offset(Math.floor(Math.random() * counted.count));

  return redirect("/recipes/by-id/" + id, 307);
};
