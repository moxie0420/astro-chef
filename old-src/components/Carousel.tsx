import RecipeCard from "@components/recipe/Card";
import {
  $likedRecipes,
  $randomRecipes,
  $recipesById,
} from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import createEmblaCarousel from "embla-carousel-solid";
import { For, Show, Suspense } from "solid-js";

interface props {
  title: string;
  type?: "random" | "id" | "liked" | "popular";
}

const Carousel = (props: props) => {
  const type = () => props.type ?? "random";

  const random = useStore($randomRecipes);
  const id = useStore($recipesById);
  const liked = useStore($likedRecipes);

  const current = () => {
    switch (type()) {
      case "id":
        return id();
      case "random":
        return random();
      case "liked":
        return liked();
      case "popular":
    }
  };

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
        class="bg-surface border-highlightHigh m-1 w-full overflow-x-visible rounded-lg"
      >
        <div class="m-1 flex max-h-fit min-h-80 flex-row gap-2">
          <Suspense>
            <Show when={current()}>
              <For each={current()}>
                {(recipe) =>
                  recipe.id ? <RecipeCard id={recipe.id ?? 1} /> : null
                }
              </For>
            </Show>
          </Suspense>
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
