import { navigate as navigate_f } from "astro:transitions/client";
import { atom, computed, onMount } from "nanostores";
import { isServer } from "solid-js/web";

export const $currentUrl = atom("");
onMount($currentUrl, () =>
  isServer ? undefined : $currentUrl.set(window.location.pathname),
);

export const $currentPage = computed($currentUrl, () => {
  const url = $currentUrl.get();
  if (url.match(/^\/recipe/)) return "recipes";
  if (url.match(/^\/edit/)) return "editing";
  if (url.match(/^\/$/)) return "home";
  return "";
});

export const $editing = computed($currentPage, () => {
  switch ($currentPage.get()) {
    case "home":
      return false;
    case "editing":
      return true;
    case "recipes":
      return false;
    default:
      return false;
  }
});

export const navigate = (href: string) => {
  $currentUrl.set(href);
  console.log(`Navigating to ${href}`);
  return navigate_f(href);
};
