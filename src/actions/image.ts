import S3 from "@lib/S3";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const images = {
  upload: defineAction({
    accept: "form",
    input: z.instanceof(FormData),
    handler: async (input) => {
      const files = input.values();
      const body = files.map((val) => val as File);

      const bucket = "astro-chef";

      if (!S3.doesBucketExist(bucket))
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Specified Bucket does not exist",
        });
      await S3.uploadMultiple(body.toArray(), bucket);
    },
  }),
  get: defineAction({
    input: z.object({
      path: z.union([
        z.string().endsWith(".png"),
        z.string().endsWith(".jpg"),
        z.string().endsWith(".jpeg"),
        z.string().endsWith(".gif"),
        z.string().endsWith(".webp"),
      ]),
    }),
    handler: async ({ path }) => {
      const res = await S3.fetchSingle(path, "astro-chef");
      const body = await res.toArray();
      if (!body) throw new Error("Image Not Found");
      return body;
    },
  }),
};
