import { atom } from "nanostores";
import { $currentUrl } from ".";

type menus = "main" | "create" | "upload";

export const $showMenu = atom(false);
export const $currentMenu = atom<menus>("main");

$showMenu.subscribe(() => {
  if ($showMenu.get() === false) $currentMenu.set("main");
});

$currentUrl.subscribe(() => $showMenu.set(false));

export const toggleMenu = () => $showMenu.set(!$showMenu.get());
export const closeMenu = () => $showMenu.set(false);
