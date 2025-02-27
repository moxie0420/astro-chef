import { createTRPCClient, httpLink } from "@trpc/client";
import type { TRPCRouter } from "src/procedures";

export const trpc = createTRPCClient<TRPCRouter>({
  links: [
    httpLink({
      url: "http://localhost:4321/api/trpc",
    }),
  ],
});
