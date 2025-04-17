import type { Component } from 'solid-js';
import { Match, Switch } from 'solid-js';
import Like from '~icons/solar/like-bold';

const LikeButton: Component<{
  recipeId: string;
  size?: number;
  liked: boolean;
}> = (props) => {
  const size = () => props.size;
  const liked = () => props.liked;

  return (
    <button
      onClick={async (event) => {
        event.stopPropagation();
      }}
    >
      <Switch>
        <Match when={!liked()}>
          <Like width={size() || 20} class={'text-muted transition-all'} />
        </Match>
        <Match when={liked()}>
          <Like width={size() || 20} class={'text-gold transition-all'} />
        </Match>
      </Switch>
    </button>
  );
};

export default LikeButton;
