import { recipe } from "./recipe";
import { ingredient } from "./ingredient";

import { defineAction } from "astro:actions";

import { z } from "astro:schema";
import { IMAGE_DIRECTORY } from "astro:env/server";
import fs from "fs/promises";

export const server = {
  recipe,
  ingredient,
  uploadImage: defineAction({
    accept: "form",
    input: z.object({
      image: z.array(z.instanceof(File)),
    }),
    handler: async ({ image }) => {
      for (let x = 0; x < image.length; x++) {
        await fs.writeFile(
          `${IMAGE_DIRECTORY}/${image[x].name}`,
          image[x].stream()
        );
      }
    },
  }),
};
