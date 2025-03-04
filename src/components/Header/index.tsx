import CreateForm from "@components/forms/Create";
import Uploader from "@components/forms/Upload";
import { $currentMenu, $showMenu, toggleMenu } from "@lib/state/menu";
import { useStore } from "@nanostores/solid";
import { Match, Show, Switch } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion, Presence } from "solid-motionone";
import OpenMenu from "src/icons/menu-open.svg?component-solid";
import MenuIcon from "src/icons/menu.svg?component-solid";
import HeaderLinks from "./headerLinks";
import Menu from "./menu";

interface props {
  pages: {
    name: string;
    path: string;
  }[];
}

const Header = (props: props) => {
  const pages = () => props.pages;

  const showMenu = useStore($showMenu);
  const currentMenu = useStore($currentMenu);

  return (
    <div class="bg-surface border-highlightHigh text-text sticky top-0 z-50 flex w-full justify-between rounded-md p-1 font-extrabold shadow-lg md:text-3xl">
      <HeaderLinks pages={pages()} />

      <button onClick={toggleMenu}>
        <Switch>
          <Match when={showMenu()}>
            <OpenMenu />
          </Match>
          <Match when={!showMenu()}>
            <MenuIcon />
          </Match>
        </Switch>
      </button>

      <Presence>
        <Show when={showMenu()}>
          <Portal>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, easing: "ease-in-out" }}
              class="text-text fixed inset-0 z-40 flex size-full backdrop-blur-sm"
            >
              <div class="m-25 mx-auto h-fit w-full max-w-md flex-col">
                <Switch>
                  <Match when={currentMenu() === "main"}>
                    <Menu />
                  </Match>
                  <Match when={currentMenu() === "create"}>
                    <CreateForm />
                  </Match>
                  <Match when={currentMenu() === "upload"}>
                    <Uploader />
                  </Match>
                </Switch>
              </div>
            </Motion.div>
          </Portal>
        </Show>
      </Presence>
    </div>
  );
};

export default Header;
