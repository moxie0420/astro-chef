import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";
import Ingredient from "@components/Ingredient";
import { Image } from "@unpic/solid";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RouteComponent,
  notFoundComponent: () => <p>This recipe doesn't Exist!</p>,
});

function RouteComponent() {
  const { recipeId } = Route.useParams()();
  const recipe = Recipes.findOne({ id: recipeId });

  return (
    <div class="flex">
      <div class="bg-base-200 rounded-box w-56 text-center">
        <p>Ingredients</p>
        <ul class="list">
          <For each={recipe?.ingredients}>
            {(ingredient) => <Ingredient ingredient={ingredient} />}
          </For>
        </ul>
      </div>
      <div class="flex w-full flex-col">
        <div class="mx-auto">
          <figure>
            <Image
              src={recipe?.image?.url || "https://picsum.photos/400/200"}
              width={400}
              height={200}
              alt={recipe?.image?.description}
            />
          </figure>
          <div>
            <h1 class="text-3xl">{recipe?.title}</h1>
            <h2 class="text-xl">by {recipe?.author}</h2>
          </div>
          <div class="divider" />
          <p class="bg-neutral rounded-box p-1.5">
            {recipe?.about?.description}
          </p>
          <div class="divider" />
          <div class="bg-neutral rounded-box prose p-1.5" />
        </div>
      </div>
    </div>
  );
}
