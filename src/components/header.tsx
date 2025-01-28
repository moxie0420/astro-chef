import { createSignal, Match, Show, Switch, type Component } from "solid-js";
import { Portal } from "solid-js/web";
import HeaderLinks from "./headerLinks";
import Uploader from "./uploader";

interface props {
  pages: {
    name: string;
    path: string;
  }[];
  editing?: boolean;
  recipeId?: number;
}

const Header: Component<props> = (props) => {
  const pages = () => props.pages;
  const editing = () => props.editing || false;
  const recipeId = () => props.recipeId;

  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <>
      <div class="bg-surface border-highlightHigh text-text sticky top-0 z-50 flex w-full justify-between rounded-md p-1 font-extrabold shadow-lg md:text-3xl">
        <HeaderLinks pages={pages()} editing={editing() || false} />
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen());
          }}
        >
          test
        </button>
      </div>
      <Show when={isMenuOpen()}>
        <Portal>
          <div class="text-text absolute top-0 left-0 z-40 flex size-full backdrop-blur-sm">
            <div class="m-auto flex w-full max-w-md flex-col gap-1">
              <div class="mx-auto size-full">
                <Uploader />
              </div>

              <Switch>
                <Match when={editing()}>
                  <button class="bg-muted rounded-md">Delete</button>
                  <button class="bg-muted rounded-md">Save & Exit</button>
                </Match>
                <Match when={!editing()}>
                  <button class="bg-muted rounded-md">Edit</button>
                  <button class="bg-muted rounded-md">Create</button>
                </Match>
              </Switch>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};

export default Header;
