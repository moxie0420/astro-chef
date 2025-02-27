import { publicProcedure, router } from "@lib/trpc";
import { trpc } from "@lib/trpc/client";
import { expect, expectTypeOf, test } from "vitest";

test("Can create TRPC server", () => {
  expect(router).toBeDefined;
  expect(publicProcedure).toBeDefined;
});

test("Can create TRPC client", () => {
  expect(trpc).toBeDefined;
  expectTypeOf(trpc).toMatchTypeOf<typeof trpc>();
});
