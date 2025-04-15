import { RecipeEditor } from "@components/forms/RecipeEditor";
import Image from "@components/Image";
import LikeButton from "@components/likeButton";
import { $editing } from "@lib/state";
import { $currentRecipe, $currentRecipeData } from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import { Match, Switch } from "solid-js";

const RecipeInfo = () => {
  const editing = useStore($editing);
  const recipe = useStore($currentRecipeData);
  const id = useStore($currentRecipe);

  return (
    <Switch>
      <Match when={!editing()}>
        <div class="bg-overlay text-text mx-auto flex max-w-2xl flex-col gap-1 rounded-md p-2 md:flex-row">
          <div class="bg-highlightMed flex basis-3/8 flex-col gap-1 rounded-md p-1">
            <span class="basis-1/16 text-3xl font-bold">
              {recipe()?.title || `"Untitled"`}
            </span>
            <span class="basis-1/16 text-xl">
              By {recipe()?.author || "No One"}
            </span>
            <p class="basis-full text-lg">{recipe()?.description}</p>
            <div class="bg-highlightHigh flex flex-col rounded-md p-1 text-nowrap">
              <p>Prep time: {recipe()?.prepTime}</p>
              <p>Cook time: {recipe()?.cookTime}</p>
            </div>
          </div>

          <div class="flex basis-full flex-col">
            <div class="m-auto">
              <Image src={recipe()?.image} alt={recipe()?.imageAlt} />
            </div>

            <div class="bg-highlightMed m-1 mx-auto max-w-full min-w-1/2 rounded-md text-center">
              {recipe()?.imageAlt}
            </div>

            <div class="bg-highlightHigh relative mt-1 flex flex-col rounded-md p-2">
              <p>{recipe()?.views} Views</p>
              <p>
                Created on{" "}
                {recipe()?.created.substring(0, 10).replaceAll("-", "/")} at{" "}
                {recipe()?.created.substring(11, 19)}
              </p>
              <p>
                Last edited at {recipe()?.edited.substring(11, 19)} on{" "}
                {recipe()?.edited.substring(0, 10).replaceAll("-", "/")}
              </p>
              <div class="absolute top-0 right-1">
                <LikeButton recipeId={id()} />
              </div>
            </div>
          </div>
        </div>
      </Match>
      <Match when={editing()}>
        <RecipeEditor />
      </Match>
    </Switch>
  );
};

export default RecipeInfo;
