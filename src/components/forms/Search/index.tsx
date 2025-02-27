import { type Component, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import type { filters } from "src/entity/Recipe/helpers";
import TextInput from "../inputs/TextInput";

const SearchOptions: Component<{
  number: number;
  sort: "random" | "popular" | "title" | "by-id";
  search?: string;
}> = (props) => {
  const number = () => props.number;
  const sort = () => props.sort;
  const search = () => props.search;

  const filters: Array<{ text: string; name: filters }> = [
    {
      text: "Liked Recipes",
      name: "liked",
    },
  ];

  const [form, setForm] = createStore({
    number: number(),
    sort: sort(),
    search: search(),
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
      class="bg-overlay m-1 mx-auto flex max-w-md flex-col gap-1 rounded-md p-1"
    >
      <TextInput
        name="search"
        onChange={updateFormField}
        placeholder="Search..."
        value={search() ? search() : ""}
      >
        Search for Recipes
      </TextInput>

      <select
        name="sort"
        onChange={updateFormField}
        class="bg-highlightHigh text-text my-auto w-full rounded-md px-2"
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

      <div class="text-text m-1 flex flex-col">
        <label for="count">Recipes per page</label>
        <input
          type="number"
          name="count"
          onChange={updateFormField}
          value={form.number}
          class="bg-muted rounded-md px-2"
        />
      </div>

      <button type="submit" class="bg-pine text-text m-1 rounded-md text-xl">
        Search
      </button>
      <input type="submit" hidden />
    </form>
  );
};

export default SearchOptions;
