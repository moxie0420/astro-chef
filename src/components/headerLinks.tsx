import { navigate } from "astro:transitions/client";
import { createSignal, For, onMount, type Component } from "solid-js";

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

  onMount(() => {
    document.addEventListener("astro:after-swap", () => {
      const path = window.location.pathname.substring(0, 8);
      setCurrentPage(path);
    });
  });

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
            class="data-[editing=true]:data-[current=true]:bg-love data-[current=true]:bg-pine rounded-lg p-1 transition ease-in-out"
            data-editing={editing()}
            data-current={page.path === currentPage()}
          >
            {page.name}
          </button>
        )}
      </For>
    </div>
  );
};

export default HeaderLinks;
