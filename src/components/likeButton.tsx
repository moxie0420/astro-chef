import { actions } from "astro:actions";
import type { Component } from "solid-js";
import { createEffect, createSignal, Show } from "solid-js";

import Like from "src/icons/like.svg?component-solid";

const LikeButton: Component<{
  liked: boolean;
  recipeId: number;
  size?: number;
}> = (props) => {
  const id = () => props.recipeId;
  const size = () => props.size;

  const [liked, setLiked] = createSignal(props.liked);

  const toggleLiked = () => setLiked(!liked());

  createEffect(() => {
    actions.Recipe.setLiked({ id: id(), liked: liked() });
  });

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        toggleLiked();
      }}
    >
      <Show
        when={liked()}
        fallback={
          <Like width={size() || 20} class={"text-muted transition-all"} />
        }
      >
        <Like width={size() || 20} class={"text-gold transition-all"} />
      </Show>
    </button>
  );
};

export default LikeButton;
