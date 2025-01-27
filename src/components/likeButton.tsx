import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";

import Like from "src/icons/like.svg?component-solid";

const LikeButton: Component<{ liked: boolean; recipeId: number }> = (props) => {
  const [liked, setLiked] = createSignal(props.liked);

  const toggleLiked = () => setLiked(!liked());

  return (
    <button onClick={() => toggleLiked()}>
      <Show
        when={liked()}
        fallback={<Like width={20} class={"text-muted transition-all"} />}
      >
        <Like width={20} class={"text-gold transition-all"} />
      </Show>
    </button>
  );
};

export default LikeButton;
