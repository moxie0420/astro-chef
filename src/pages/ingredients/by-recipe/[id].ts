import type { APIRoute } from "astro";
import { db } from "@lib/database";
import { ingredients } from "schema";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ params }) => {
  const res = await db
    .select()
    .from(ingredients)
    .where(eq(ingredients.Recipe, parseInt(params.id as string)));
  if (!res) return new Response(null, { status: 400 });
  return new Response(JSON.stringify(res), { status: 200 });
};

export const ALL: APIRoute = () => {
  return new Response(null, {
    status: 404,
    statusText: "Not found",
  });
};
