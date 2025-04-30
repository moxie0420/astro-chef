import MaterialSymbolsMenuRounded from "~icons/material-symbols/menu-rounded?width=32px&height=32px";
import LineMdSearch from "~icons/line-md/search?width=32px&height=32px";
import { Link } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { Editing } from "@lib/state";
import { useStore } from "@tanstack/solid-store";
import CreateForm from "./forms/Create";
import { Portal } from "solid-js/web";

const Navbar = () => {
  let dialogRef: HTMLDialogElement | undefined;
  let drawerRef: HTMLInputElement | undefined;

  const editing = useStore(Editing);

  return (
    <nav class="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
      <div class="navbar-start">
        <div class="drawer">
          <label for="mainMenu">
            <MaterialSymbolsMenuRounded />
          </label>
          <input
            ref={drawerRef}
            type="checkbox"
            role="button"
            class="drawer-toggle"
            id="mainMenu"
          />
          <div class="drawer-side">
            <label
              for="mainMenu"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <ul class="menu bg-base-200 min-h-full w-52 p-4">
              <li>
                <Link
                  to="/recipes"
                  class="btn btn-accent not-[&.active]:btn-soft"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  class="btn btn-accent not-[&.active]:btn-soft"
                >
                  About
                </Link>
              </li>

              <li>
                <div class="divider font-semibold"></div>
              </li>
              <li>
                <button
                  class="btn btn-primary"
                  onclick={() => {
                    drawerRef!.checked = false;
                    dialogRef?.showModal();
                  }}
                >
                  Create a new recipe
                </button>
                <Portal>
                  <dialog ref={dialogRef} class="modal">
                    <CreateForm />
                    <form method="dialog" class="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </Portal>
              </li>
              <Show when={editing()}>
                <li>
                  <button class="btn btn-secondary">Delete this recipe</button>
                </li>
              </Show>
            </ul>
          </div>
        </div>
      </div>

      <div class="navbar-center">
        <Link to="/" class="btn btn-ghost text-xl font-bold">
          astroChef
        </Link>
      </div>

      <div class="navbar-end">
        <LineMdSearch />
      </div>
    </nav>
  );
};

export default Navbar;
