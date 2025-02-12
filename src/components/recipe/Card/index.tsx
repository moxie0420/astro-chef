import type { Recipe } from "@lib/recipe";
import { navigate } from "astro:transitions/client";
import { type Component } from "solid-js";

import LikeButton from "@components/likeButton";

import Image from "@components/assets/image";

const RecipeCard: Component<{ recipe: Recipe }> = (props) => {
  const recipe = () => props.recipe;

  return (
    <div
      onClick={async () => await navigate(`/recipes/${recipe().id}`)}
      class="text-text bg-highlightLow border-base m-1 mx-auto flex max-h-full min-w-64 flex-col rounded-md p-1"
    >
      <Image src={recipe().image} alt={recipe().imageAlt} />

      <div class="bg-highlightMed relative m-1 mx-auto flex h-full min-h-26 w-full basis-full flex-col overflow-x-scroll rounded-md p-1.5">
        <p class="text-lg font-bold md:text-2xl">
          {recipe().title === "" ? `"Untitled"` : recipe().title}
        </p>
        <p class="text-md pb-2 font-semibold md:text-lg">
          By {recipe().author === "" ? "No One Yet" : recipe().author}
        </p>
        <p class="text-sm">{recipe().description}</p>
        <div class="absolute right-1">
          <LikeButton size={26} liked={recipe().liked} recipeId={recipe().id} />
        </div>
      </div>

      <div class="mx-auto flex w-full basis-full gap-1 text-xs">
        <div class="bg-highlightMed my-auto flex basis-2/3 flex-col rounded-md px-1 text-nowrap">
          <div class="flex justify-between gap-1">
            <p>To Prep</p>
            <p>{recipe().prepTime}</p>
          </div>

          <div class="flex justify-between gap-1">
            <p>To Cook</p>
            <p>{recipe().cookTime}</p>
          </div>
        </div>
        <div class="bg-highlightMed mx-auto my-auto flex w-full basis-2/3 flex-col rounded-md px-1 text-nowrap">
          <div class="flex justify-between gap-1">
            <p>Created</p>
            <p>{recipe().created?.toLocaleDateString()}</p>
          </div>
          <div class="flex justify-between gap-1">
            <p>Edited</p>
            <p>{recipe().edited?.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
