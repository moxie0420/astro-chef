import type { APIRoute } from "astro";
import { db, ingredient } from "astro:db";
import { v4 as uuidv4 } from "uuid";

export const POST: APIRoute = async ({ params }) => {
  const uuid: string = uuidv4();
  await db.insert(ingredient).values({
    id: uuid,
    recipeId: params.id,
    name: params.name,
    amount: params.amount,
    unit: params.unit,
  });
  return new Response(null, { status: 204 });
};
