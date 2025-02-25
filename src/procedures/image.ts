import S3 from "@lib/S3";
import { publicProcedure, router } from "@lib/trpc";
import { TRPCError } from "@trpc/server";
import { S3_BUCKET } from "astro:env/server";
import { z } from "astro:schema";

export const imageRouter = router({
  upload: publicProcedure
    .input(z.instanceof(FormData))
    .mutation(async ({ input }) => {
      if (!S3.doesBucketExist(S3_BUCKET))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The requested bucket was not found",
        });

      const files = input.values();
      const data = files.map((val) => val as File);

      return S3.uploadMultiple(data.toArray(), S3_BUCKET);
    }),
  fetch: publicProcedure
    .input(
      z.union([
        z.string().endsWith(".png"),
        z.string().endsWith(".jpg"),
        z.string().endsWith(".jpeg"),
        z.string().endsWith(".gif"),
        z.string().endsWith(".webp"),
      ]),
    )
    .query(async ({ input }) => {
      const res = await S3.fetchSingle(input, "astro-chef");
      const body = await res.toArray();
      if (!body || body.length < 1)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Requested image was not found",
        });

      return body;
    }),
});
