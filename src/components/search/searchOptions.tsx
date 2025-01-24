import { type Component, For, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import type { filter_t } from "@lib/types";

const SearchOptions: Component<{
  page: number;
  number: number;
  filter?: Array<filter_t>;
  sort: "random" | "popular" | "title" | "by-id";
}> = (props) => {
  const page = () => props.page;
  const number = () => props.number;
  const filter = () => props.filter;
  const sort = () => props.sort;

  const filters: Array<{ text: string; name: filter_t }> = [
    {
      text: "Liked Recipes",
      name: "liked",
    },
  ];

  const [form, setForm] = createStore({
    page: page(),
    number: number(),
    filter: filter() || [],
    sort: sort(),
  });

  const updateFormField: JSX.EventHandler<
    HTMLInputElement | HTMLSelectElement,
    Event
  > = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    setForm({
      [input.name]: input.value,
    });
  };

  return (
    <form
      method="post"
      action={"/recipes"}
      class="bg-overlay m-2 mx-auto flex max-w-md flex-col gap-2 rounded-md p-2"
    >
      <input
        name="search"
        onChange={updateFormField}
        class="bg-highlightHigh rounded-lg"
        placeholder="Search..."
      />
      <select
        name="sort"
        onChange={updateFormField}
        class="bg-highlightHigh text-text my-auto w-full rounded-lg"
      >
        <option value="random" selected={"random" === sort()}>
          Random
        </option>
        <option value="views" selected={"popular" === sort()}>
          Popular
        </option>
        <option value="by-id" selected={"by-id" === sort()}>
          By Id
        </option>
        <option value="title" selected={"title" === sort()}>
          By Title
        </option>
      </select>

      <div class="text-text m-1">
        <span class="font-bold">Filters</span>
        <For each={filters}>
          {(filter) => (
            <div class="m-1 my-auto flex">
              <input
                type="checkbox"
                value={filter.name}
                name={filter.name}
                class="bg-overlay m-1 rounded-full"
                checked={props.filter?.includes(filter.name)}
                onChange={(event) => {
                  if (event.currentTarget.checked === true) {
                    setForm("filter", (currentFilters) => [
                      ...currentFilters!,
                      filter.name,
                    ]);
                  } else {
                    const old = form.filter;
                    const newfilters = old.filter((f) => f !== filter.name);
                    setForm("filter", () => newfilters);
                  }
                }}
              />
              <label for={filter.name}>{filter.text}</label>
            </div>
          )}
        </For>
      </div>
      <div class="text-text m-1 flex flex-col">
        <label for="count">Recipes per page</label>
        <input
          type="number"
          name="count"
          onChange={updateFormField}
          value={number()}
          class="bg-muted rounded-md"
        />
      </div>

      <input type="submit" hidden />
    </form>
  );
};

export default SearchOptions;
