import Navbar from "@components/Navbar";
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
} from "@tanstack/solid-router";
import { ErrorBoundary } from "solid-js";
import NrkMedia404Notfound from "~icons/nrk/media-404-notfound?width=96px&height=96px";

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div class="flex h-screen w-screen">
      <div class="rounded-box bg-base-200 mx-auto my-20 flex h-fit flex-col gap-3 p-2">
        <NrkMedia404Notfound width={128} class="mx-auto" />
        <p class="my-2 text-center text-2xl font-bold">
          Sorry, this page does not exist
        </p>
        <Link to="/" class="btn btn-primary btn-wide mx-auto">
          Home
        </Link>
      </div>
    </div>
  ),
  component: () => (
    <>
      <HeadContent />
      <Navbar />
      <ErrorBoundary
        fallback={(error, reset) => (
          <div class="rounded-box bg-base-200">
            <p>Something went wrong: {error.message}</p>
            <button class="btn btn-primary btn-wide" onClick={reset}>
              Try Again
            </button>
          </div>
        )}
      >
        <Outlet />
      </ErrorBoundary>
    </>
  ),
});
