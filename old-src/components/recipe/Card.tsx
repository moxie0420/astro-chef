import Image from "@components/Image";
import LikeButton from "@components/likeButton";
import { navigate } from "@lib/state";
import { $recipes } from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import { Suspense, type Component } from "solid-js";

const RecipeCard: Component<{ id: string }> = (props) => {
  const id = () => props.id;
  const recipes = useStore($recipes);
  const currentRecipe = () => recipes().find((recipe) => recipe.id == id());

  return (
    <div
      onClick={async () => navigate(`/recipes/${currentRecipe()?.id}`)}
      class="text-text bg-highlightLow border-base m-1 mx-auto flex max-h-full min-w-64 flex-col rounded-md p-1"
    >
      <Image src={currentRecipe()?.image} alt={currentRecipe()?.imageAlt} />

      <div class="bg-highlightMed relative m-1 mx-auto flex h-full min-h-26 w-full basis-full flex-col overflow-x-scroll rounded-md p-1.5">
        <p class="text-lg font-bold md:text-2xl">
          <Suspense fallback={<div></div>}>
            {currentRecipe()?.title === ""
              ? `"Untitled"`
              : currentRecipe()?.title}
          </Suspense>
        </p>
        <p class="text-md pb-2 font-semibold md:text-lg">
          <Suspense fallback={<div></div>}>
            By{" "}
            {currentRecipe()?.author === ""
              ? "No One Yet"
              : currentRecipe()?.author}
          </Suspense>
        </p>
        <p class="text-sm">
          <Suspense fallback={<div></div>}>
            {currentRecipe()?.description}
          </Suspense>
        </p>
        <div class="absolute right-1">
          <Suspense>
            <LikeButton size={26} recipeId={id()} />
          </Suspense>
        </div>
      </div>

      <div class="mx-auto flex w-full basis-full gap-1 text-xs">
        <div class="bg-highlightMed my-auto flex basis-2/3 flex-col rounded-md px-1 text-nowrap">
          <div class="flex justify-between gap-1">
            <p>To Prep</p>
            <Suspense>
              <p>{currentRecipe()?.prepTime}</p>
            </Suspense>
          </div>

          <div class="flex justify-between gap-1">
            <p>To Cook</p>
            <Suspense>
              <p>{currentRecipe()?.cookTime}</p>
            </Suspense>
          </div>
        </div>
        <div class="bg-highlightMed mx-auto my-auto flex w-full basis-2/3 flex-col rounded-md px-1 text-nowrap">
          <div class="flex justify-between gap-1">
            <p>Created</p>
            <Suspense>
              <p>{currentRecipe()?.created}</p>
            </Suspense>
          </div>
          <div class="flex justify-between gap-1">
            <p>Edited</p>
            <Suspense>
              <p>{currentRecipe()?.edited}</p>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
