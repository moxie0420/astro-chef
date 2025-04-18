import Carousel from "@components/Carousel";
import RecipeCard from "@components/RecipeCard";
import Recipes from "@lib/recipes";
import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const recipes = Recipes.find(
  {},
  {
    sort: { created: -1 },
    limit: 10,
  },
);

function RouteComponent() {
  return (
    <>
      <Carousel>
        <For each={recipes.fetch()}>
          {(recipe) => <RecipeCard id={recipe.id} />}
        </For>
      </Carousel>
    </>
  );
}
