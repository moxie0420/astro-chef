import { navigate } from "astro:transitions/client";
import { createResource, Suspense, type Component } from "solid-js";

import LikeButton from "@components/likeButton";

import Image from "@components/Image";
import { trpc } from "@lib/trpc/client";

const RecipeCard: Component<{ id: number }> = (props) => {
  const id = () => props.id;

  const [recipe, { refetch }] = createResource(
    async () => await trpc.recipe.getSingle.query(id()),
  );

  return (
    <div
      onClick={async () => await navigate(`/recipes/${recipe()?.id}`)}
      class="text-text bg-highlightLow border-base m-1 mx-auto flex max-h-full min-w-64 flex-col rounded-md p-1"
    >
      <Image src={recipe()?.image || undefined} alt={recipe()?.imageAlt} />

      <div class="bg-highlightMed relative m-1 mx-auto flex h-full min-h-26 w-full basis-full flex-col overflow-x-scroll rounded-md p-1.5">
        <p class="text-lg font-bold md:text-2xl">
          <Suspense fallback={<div></div>}>
            {recipe()?.title === "" ? `"Untitled"` : recipe()?.title}
          </Suspense>
        </p>
        <p class="text-md pb-2 font-semibold md:text-lg">
          <Suspense fallback={<div></div>}>
            By {recipe()?.author === "" ? "No One Yet" : recipe()?.author}
          </Suspense>
        </p>
        <p class="text-sm">
          <Suspense fallback={<div></div>}>{recipe()?.description}</Suspense>
        </p>
        <div class="absolute right-1">
          <Suspense fallback={<LikeButton size={26} liked={false} />}>
            <LikeButton
              size={26}
              liked={recipe()?.liked || false}
              recipeId={recipe()?.id}
            />
          </Suspense>
        </div>
      </div>

      <div class="mx-auto flex w-full basis-full gap-1 text-xs">
        <div class="bg-highlightMed my-auto flex basis-2/3 flex-col rounded-md px-1 text-nowrap">
          <div class="flex justify-between gap-1">
            <p>To Prep</p>
            <Suspense>
              <p>{recipe()?.prepTime}</p>
            </Suspense>
          </div>

          <div class="flex justify-between gap-1">
            <p>To Cook</p>
            <Suspense>
              <p>{recipe()?.cookTime}</p>
            </Suspense>
          </div>
        </div>
        <div class="bg-highlightMed mx-auto my-auto flex w-full basis-2/3 flex-col rounded-md px-1 text-nowrap">
          <div class="flex justify-between gap-1">
            <p>Created</p>
            <Suspense>
              <p>{recipe()?.created}</p>
            </Suspense>
          </div>
          <div class="flex justify-between gap-1">
            <p>Edited</p>
            <Suspense>
              <p>{recipe()?.edited}</p>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
