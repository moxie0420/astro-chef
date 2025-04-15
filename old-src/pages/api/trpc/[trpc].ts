import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { trpcRouter } from "src/procedures";

export const ALL: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: opts.request,
    router: trpcRouter,
  });
};
