import { render } from "solid-js/web";
import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
import "./global.css";

console.log("starting up ...");

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  scrollRestorationBehavior: "smooth",
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}

console.log("mounting ...");

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  render(() => <RouterProvider router={router} />, rootElement);
}
