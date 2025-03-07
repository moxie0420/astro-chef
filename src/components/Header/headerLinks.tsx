import { $currentPage, $editing, navigate } from "@lib/state";
import { $currentRecipe } from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import { Show } from "solid-js";

const HeaderLinks = () => {
  const currentPage = useStore($currentPage);
  const currentRecipe = useStore($currentRecipe);
  const editing = useStore($editing);

  return (
    <div class="flex gap-1">
      <button
        class="data-[current=true]:bg-pine hover:bg-base rounded-lg p-1 transition ease-in-out"
        data-current={currentPage() === "home"}
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <button
        class="data-[current=true]:bg-pine hover:bg-base rounded-lg p-1 transition ease-in-out"
        data-current={currentPage() === "recipes"}
        onClick={() => navigate("/recipes")}
      >
        Recipes
      </button>

      <Show
        when={
          currentPage() === "editing" ||
          (currentPage() === "recipes" && currentRecipe().length > 0)
        }
      >
        <button
          disabled={currentPage() === "home"}
          class="data-[editing=true]:bg-love data-[editing=false]:hover:bg-base rounded-lg p-1 transition ease-in-out"
          data-editing={editing()}
          onClick={() =>
            editing()
              ? navigate(`/recipes/${currentRecipe()}`)
              : navigate(`/edit/${currentRecipe()}`)
          }
        >
          Edit
        </button>
      </Show>
    </div>
  );
};

export default HeaderLinks;
