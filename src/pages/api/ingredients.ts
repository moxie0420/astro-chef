import type { APIRoute } from "astro";
import { db } from "astro:db";
import { ingredient } from "db/config";
import { asDrizzleTable } from "@astrojs/db/utils";

export const POST: APIRoute = async ({ params }) => {
  const typeSafeIngredient = asDrizzleTable("ingredient", ingredient);

  await db.insert(typeSafeIngredient).values({
    name: params.name as string,
    amount: params.amount,
    unit: params.unit,
    recipeId: params.id,
    id: 0,
  });
  return new Response(null, { status: 204 });
};
