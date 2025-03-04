import { $recipes, updateLiked } from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import type { Component } from "solid-js";
import { createSignal, Match, Switch } from "solid-js";

import Like from "src/icons/like.svg?component-solid";

const LikeButton: Component<{
  recipeId: string;
  size?: number;
}> = (props) => {
  const recipes = useStore($recipes);
  const currentRecipe = () =>
    recipes().find((recipe) => (recipe.id = props.recipeId));
  const size = () => props.size;

  const [liked, setLiked] = createSignal(currentRecipe()?.liked || false);
  const toggleLiked = () => setLiked(!liked());

  return (
    <button
      onClick={async (event) => {
        event.stopPropagation();
        toggleLiked();
        await updateLiked(liked(), props.recipeId);
      }}
    >
      <Switch>
        <Match when={!liked()}>
          <Like width={size() || 20} class={"text-muted transition-all"} />
        </Match>
        <Match when={liked}>
          <Like width={size() || 20} class={"text-gold transition-all"} />
        </Match>
      </Switch>
    </button>
  );
};

export default LikeButton;
