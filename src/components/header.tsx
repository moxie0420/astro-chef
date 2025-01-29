import { navigate } from "astro:transitions/client";
import {
  createEffect,
  createSignal,
  lazy,
  Match,
  onMount,
  Show,
  Switch,
  type Component,
} from "solid-js";
import { Portal } from "solid-js/web";

import HeaderLinks from "./headerLinks";

import { Motion, Presence } from "solid-motionone";
import OpenMenu from "src/icons/menu-open.svg?component-solid";
import Menu from "src/icons/menu.svg?component-solid";

const CreateForm = lazy(() => import("./createForm"));
const Uploader = lazy(() => import("./uploader"));

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
  const [creatingNew, setCreatingNew] = createSignal(false);

  createEffect(() => {
    if (isMenuOpen() == false) setCreatingNew(false);
  });

  onMount(() =>
    document.addEventListener("astro:after-preparation", () =>
      setIsMenuOpen(false),
    ),
  );

  return (
    <>
      <div class="bg-surface border-highlightHigh text-text sticky top-0 z-50 flex w-full justify-between rounded-md p-1 font-extrabold shadow-lg md:text-3xl">
        <HeaderLinks pages={pages()} editing={editing() || false} />
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen());
          }}
        >
          <Presence>
            <Switch>
              <Match when={isMenuOpen()}>
                <OpenMenu />
              </Match>
              <Match when={!isMenuOpen()}>
                <Menu />
              </Match>
            </Switch>
          </Presence>
        </button>
      </div>
      <Presence exitBeforeEnter>
        <Show when={isMenuOpen()}>
          <Portal>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, easing: "ease-in-out" }}
              class="text-text absolute top-0 left-0 z-40 flex size-full backdrop-blur-sm"
            >
              <div class="m-25 mx-auto h-fit w-full max-w-md flex-col">
                <Motion
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, easing: "ease-out" }}
                >
                  <Uploader menuCloser={setIsMenuOpen} />

                  <div class="m-1 flex flex-col gap-1 rounded-md p-2">
                    <Switch>
                      <Match when={editing()}>
                        <button class="bg-muted rounded-md">Delete</button>
                        <button
                          class="bg-muted rounded-md"
                          onClick={() =>
                            navigate(`/recipes/by-id/${recipeId()}`)
                          }
                        >
                          Save & Exit
                        </button>
                      </Match>
                      <Match when={!editing()}>
                        <Motion.button
                          initial={{ y: -100 }}
                          animate={{ y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.75 }}
                          class="bg-muted rounded-md text-xl font-bold"
                          onClick={() =>
                            navigate(`/recipes/edit?id=${recipeId()}`)
                          }
                        >
                          Edit
                        </Motion.button>

                        <Motion.div
                          initial={{ y: -100 }}
                          animate={{ y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.75 }}
                        >
                          <Show
                            when={creatingNew()}
                            fallback={
                              <Motion.button
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                class="bg-muted w-full rounded-md text-xl font-bold"
                                onClick={() => {
                                  setCreatingNew(!creatingNew());
                                }}
                              >
                                Create {creatingNew()}
                              </Motion.button>
                            }
                          >
                            <CreateForm closeForm={setCreatingNew} />
                          </Show>
                        </Motion.div>
                      </Match>
                    </Switch>
                  </div>
                </Motion>
              </div>
            </Motion.div>
          </Portal>
        </Show>
      </Presence>
    </>
  );
};

export default Header;
