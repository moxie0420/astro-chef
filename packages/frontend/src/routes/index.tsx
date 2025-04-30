import Carousel from "@components/Carousel";
import RecipeCard from "@components/RecipeCard";
import { shuffle } from "@lib/math";
import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";
import { db } from "../database/recipes";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const recipes = await db.allDocs();

const shuffled = () => shuffle(recipes.rows);

function RouteComponent() {
  return (
    <div class="m-2 flex flex-col gap-2.5">
      <div class="divider">
        <p class="text-xl">
          Some <b>random</b> recipes
        </p>
      </div>
      <Carousel>
        <For each={shuffled()}>{(recipe) => <RecipeCard id={recipe.id} />}</For>
      </Carousel>

      <div class="divider">
        <p class="text-xl">
          Some <b>new</b> recipes
        </p>
      </div>
      <Carousel>
        <For each={recipes.rows}>
          {(recipe) => <RecipeCard id={recipe.id} />}
        </For>
      </Carousel>
    </div>
  );
}
