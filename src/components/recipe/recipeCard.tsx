import type { Recipe } from "@lib/types";
import { navigate } from "astro:transitions/client";
import { type Component } from "solid-js";

import Image from "@components/assets/image";
import LikeButton from "@components/likeButton";

const RecipeCard: Component<{ recipe: Recipe }> = (props) => {
  const recipe = () => props.recipe;

  return (
    <div
      onClick={async () => await navigate(`/recipes/by-id/${recipe().id}`)}
      class="text-text bg-highlightLow border-base m-1 flex w-full flex-col rounded-md"
    >
      <div class="relative flex aspect-video w-full">
        <div class="m-auto basis-2/3 p-1">
          <Image src={recipe().image} alt={recipe().imageAlt} />
        </div>
        <div class="bg-highlightMed m-1 flex w-full flex-col rounded-md p-1.5">
          <p class="text-2xl font-bold">{recipe().title}</p>
          <p class="pb-2 text-lg font-semibold">By {recipe().author}</p>
          <p>{recipe().description}</p>
        </div>

        <div class="absolute top-0.5 left-0.5">
          <LikeButton size={26} liked={recipe().liked} recipeId={recipe().id} />
        </div>
      </div>
      <div class="m-1 mx-auto flex w-full gap-1 p-1.5">
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
