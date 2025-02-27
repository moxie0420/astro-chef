import { fetchSingle, uploadMultiple } from "@lib/files";
import { doesBucketExist, getFileUrl, uploader } from "@lib/files/S3";
import { publicProcedure, router } from "@lib/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "astro:schema";

export const imageRouter = router({
  upload: publicProcedure
    .input(z.instanceof(FormData))
    .mutation(async ({ input }) => {
      if (!doesBucketExist())
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The requested bucket was not found",
        });

      const files = input.values();
      const data = files.map((val) => val as File);

      return uploadMultiple(data.toArray(), uploader);
    }),
  fetch: publicProcedure
    .input(
      z
        .union([
          z.string().endsWith(".png"),
          z.string().endsWith(".jpg"),
          z.string().endsWith(".jpeg"),
          z.string().endsWith(".gif"),
          z.string().endsWith(".webp"),
        ])
        .nullable(),
    )
    .query(async ({ input }) => {
      if (!input)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested image was not found",
        });
      if (!doesBucketExist())
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested bucket was not found",
        });
      return fetchSingle(input, getFileUrl);
    }),
});
