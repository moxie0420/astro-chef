import { atom } from "nanostores";

type menus = "main" | "create" | "upload";

export const $editing = atom(false);
export const toggleEditing = () => $editing.set(!$editing.get());

export const $showMenu = atom(false);
export const $currentMenu = atom<menus>("main");

$showMenu.subscribe(() => {
  if ($showMenu.get() === false) $currentMenu.set("main");
});

export const toggleMenu = () => $showMenu.set(!$showMenu.get());
export const closeMenu = () => $showMenu.set(false);
