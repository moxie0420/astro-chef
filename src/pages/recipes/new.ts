import type { APIRoute } from "astro";
import { db, Recipe } from "astro:db";

export const GET: APIRoute = async ({ redirect }) => {
  const res = await db
    .insert(Recipe)
    .values({
      author: "",
      title: "",
    })
    .returning({ insertedId: Recipe.id });

  if (res) return redirect("/recipes/edit/" + res[0].insertedId, 307);
  else return new Response(null, { status: 400 });
};
