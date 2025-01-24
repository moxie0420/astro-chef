import { navigate } from "astro:transitions/client";
import { createSignal, For, type Component } from "solid-js";

const HeaderLinks: Component<{
  pages: {
    name: string;
    path: string;
  }[];
  editing: boolean;
}> = (props) => {
  const pages = () => props.pages;
  const editing = () => props.editing;

  const [currentPage, setCurrentPage] = createSignal(
    window.location.pathname.substring(0, 8),
  );

  return (
    <div class="flex">
      <For each={pages()}>
        {(page) => (
          <button
            type="button"
            onClick={() => {
              const nextPage =
                page.path === "/recipes/random" ? "/recipes" : page.path;
              setCurrentPage(nextPage);
              navigate(page.path);
            }}
            class={`rounded-lg p-1 transition ease-in-out ${page.path === currentPage() ? (editing() ? "bg-love" : "bg-pine") : ""}`}
          >
            {page.name}
          </button>
        )}
      </For>
    </div>
  );
};

export default HeaderLinks;
