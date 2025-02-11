import RecipeCard from "@components/recipe/recipeCard";
import type { Recipe } from "@lib/types";
import createEmblaCarousel from "embla-carousel-solid";
import { type ParentComponent, For } from "solid-js";

const Carousel: ParentComponent<{ title: string; recipes?: Recipe[] }> = (
  props,
) => {
  const recipes = () => props.recipes;

  const [emblaRef, emblaApi] = createEmblaCarousel(() => ({ loop: true }));

  const next = () => emblaApi()?.scrollNext();
  const prev = () => emblaApi()?.scrollPrev();

  return (
    <div class="flex w-screen flex-col">
      <span class="text-text text-center text-5xl font-bold">
        {props.title}
      </span>

      <div
        ref={emblaRef}
        class="bg-surface border-highlightHigh m-1 w-full overflow-x-hidden rounded-lg"
      >
        <div class="m-1 flex max-h-fit min-h-80 flex-row gap-2">
          <For each={recipes()}>
            {(recipe) => <RecipeCard recipe={recipe} />}
          </For>
        </div>
      </div>

      <div class="m-1 flex justify-between">
        <button
          class="text-text bg-pine rounded-md px-2 text-lg"
          onClick={prev}
        >
          prev
        </button>
        <button
          class="text-text bg-pine rounded-md px-2 text-lg"
          onClick={next}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
