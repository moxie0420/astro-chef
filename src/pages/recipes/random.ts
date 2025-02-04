import type { APIContext } from "astro";
import { actions } from "astro:actions";

export async function GET(context: APIContext) {
  const { data } = await context.callAction(actions.Recipe.getRandom, null);
  return context.redirect(`/recipes/by-id/${data?.id}`);
}
