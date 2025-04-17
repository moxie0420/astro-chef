import { createRootRoute, Link, Outlet } from "@tanstack/solid-router";
import MaterialSymbolsMenuRounded from "~icons/material-symbols/menu-rounded";

export const Route = createRootRoute({
  component: () => (
    <>
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <MaterialSymbolsMenuRounded class="size-5" />
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
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
                  class="btn btn-accent not-[&.active]:btn-soft "
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" class="btn btn-ghost text-xl ">
            AstroChef
          </Link>
        </div>

        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li>
              <Link
                to="/recipes"
                class="btn btn-accent not-[&.active]:btn-soft"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link to="/about" class="btn btn-accent not-[&.active]:btn-soft ">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  ),
});
