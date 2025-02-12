import { navigate } from "astro:transitions/client";
import { createSignal, For, onMount, type Component } from "solid-js";

const HeaderLinks: Component<{
  pages: {
    name: string;
    path: string;
    disabled?: boolean;
  }[];
  editing: boolean;
}> = (props) => {
  const pages = () => props.pages;
  const editing = () => props.editing;

  const [currentPage, setCurrentPage] = createSignal<string>();

  onMount(() => {
    if (window.location.pathname.includes("edit")) setCurrentPage("/edit");
    if (window.location.pathname.includes("recipes"))
      setCurrentPage("/recipes");
    if (window.location.pathname === "/") setCurrentPage("/");

    document.addEventListener("astro:after-preparations", () => {
      if (window.location.pathname.includes("edit")) setCurrentPage("/edit");
      if (window.location.pathname.includes("recipes"))
        setCurrentPage("/recipes");
      if (window.location.pathname === "/") setCurrentPage("/");
    });
  });

  return (
    <div class="flex gap-1">
      <For each={pages()}>
        {(page) => (
          <button
            disabled={page.disabled}
            type="button"
            onClick={() => {
              setCurrentPage(page.path);
              navigate(page.path);
            }}
            class="data-[editing=true]:data-[current=true]:bg-love data-[current=true]:bg-pine hover:bg-base rounded-lg p-1 transition ease-in-out"
            data-editing={currentPage() === "/edit"}
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
