import Button from "@components/Button";
import { $currentMenu, $editing } from "@lib/state/menu";
import { $currentRecipe } from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import { navigate } from "astro:transitions/client";
import type { Component } from "solid-js";
import { Match, Show, Switch } from "solid-js";

const Menu: Component = () => {
  const editing = useStore($editing);
  const currentRecipe = useStore($currentRecipe);

  const goto = (path: "recipes" | "edit") =>
    navigate(`/${path}/${currentRecipe}`);

  return (
    <div class="m-1 flex flex-col gap-1 rounded-md p-2">
      <Switch>
        <Match when={editing()}>
          <Button>Delete</Button>
          <Button onClick={() => goto("recipes")}>Save & Exit</Button>
        </Match>
        <Match when={!editing()}>
          <Button onClick={() => $currentMenu.set("create")}>New Recipe</Button>
          <Show when={window.location.pathname.startsWith("/recipes/")}>
            <Button onClick={() => goto("edit")}>Edit</Button>
          </Show>
        </Match>
      </Switch>
    </div>
  );
};

export default Menu;
