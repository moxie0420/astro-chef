import { fetchSingle, uploadMultiple } from "@lib/files";
import { getFileUrl, uploader } from "@lib/files/S3";
import { publicProcedure, router } from "@lib/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "astro:schema";

export const imageRouter = router({
  upload: publicProcedure
    .input(z.instanceof(FormData))
    .mutation(async ({ input }) => {
      const files = input.values();
      const data = files.map((val) => val as File).toArray();

      const final = data.map(async (file) => ({
        data: Buffer.from(await file.arrayBuffer()),
        name: file.name,
      }));

      return await uploadMultiple(final, uploader);
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
      const res = await fetchSingle(input, getFileUrl);
      if (res) return res;
      return;
    }),
});
