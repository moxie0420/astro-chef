import RecipeCard from "@components/RecipeCard";
import { createFileRoute } from "@tanstack/solid-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { db } from "../../database/recipes";

const RecipeSearchSchema = z.object({
  page: fallback(z.number().min(1), 1).default(1),
  sort: fallback(z.enum(["newest", "oldest", "modified"]), "newest").default(
    "newest",
  ),
});

export const Route = createFileRoute("/recipes/")({
  validateSearch: zodValidator(RecipeSearchSchema),
  component: RouteComponent,
  loader: () => db.allDocs(),
});

function RouteComponent() {
  let listRef: HTMLDivElement | undefined;

  const recipes = Route.useLoaderData();

  const rowVirtualizer = createVirtualizer({
    count: recipes().total_rows,
    estimateSize: () => 375,
    getScrollElement: () => listRef ?? null,
    overscan: 5,
  });

  const colVirtualizer = createVirtualizer({
    count: 5,
    estimateSize: () => 315,
    getScrollElement: () => listRef ?? null,
    overscan: 5,
    paddingStart: 5,
  });

  return (
    <div class="relative h-[100vh] overflow-auto" ref={listRef}>
      <div
        class={`h-[${rowVirtualizer.getTotalSize()}px] w-[${colVirtualizer.getTotalSize()}px] relative`}
      >
        {rowVirtualizer.getVirtualItems().map((rowItem) =>
          colVirtualizer.getVirtualItems().map((colItem) => (
            <div
              style={{
                position: "absolute",
                top: `${rowItem.start}px`,
                left: `${colItem.start}px`,
                height: `${rowItem.size}px`,
                width: `${colItem.size}px`,
              }}
            >
              <RecipeCard id={recipes().rows[rowItem.index].id} />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
