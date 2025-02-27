import { trpc } from "@lib/trpc/client";
import createEmblaCarousel from "embla-carousel-solid";
import {
  type ParentComponent,
  createResource,
  For,
  lazy,
  onMount,
  Suspense,
} from "solid-js";

const RecipeCard = lazy(() => import("@components/recipe/Card"));

const Carousel: ParentComponent<{ title: string }> = (props) => {
  const [recipes, { refetch }] = createResource(
    async () =>
      await trpc.recipe.getMultiple.query({
        number: 10,
      }),
  );

  onMount(() => {
    const event = new EventSource("http://localhost:4321/api/sse");
    event.addEventListener("message", (data) => {
      console.log("received message: " + data.data);
      if (data.data == `"update"`) refetch();
    });
  });

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
            <For each={recipes()}>
              {(recipe) => <RecipeCard id={recipe.id} />}
            </For>
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
