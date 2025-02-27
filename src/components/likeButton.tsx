import { trpc } from "@lib/trpc/client";
import type { Component } from "solid-js";
import { createSignal, Match, Switch } from "solid-js";

import Like from "src/icons/like.svg?component-solid";

const LikeButton: Component<{
  liked: boolean;
  recipeId?: number;
  size?: number;
}> = (props) => {
  const id = () => props.recipeId;
  const size = () => props.size;

  const [liked, setLiked] = createSignal(props.liked);
  const toggleLiked = () => setLiked(!liked());

  const updateDB = () =>
    liked()
      ? trpc.recipe.like.mutate(id()!)
      : trpc.recipe.dislike.mutate(id()!);

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        toggleLiked();
        updateDB();
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
