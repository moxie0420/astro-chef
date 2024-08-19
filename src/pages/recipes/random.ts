import type { APIRoute } from "astro";
import { db } from "@lib/database";
import { count } from "drizzle-orm";
import { recipes } from "schema";

export const GET: APIRoute = async () => {
  const counted = await db.select({ count: count() }).from(recipes);

  const res = await db
    .select()
    .from(recipes)
    .orderBy(recipes.Id)
    .limit(1)
    .offset(Math.floor(Math.random() * counted[0].count));
  return new Response(JSON.stringify(res), { status: 200 });
};

export const ALL: APIRoute = () => {
  return new Response(null, {
    status: 404,
    statusText: "Not found",
  });
};
