import { ingredient } from "./ingredient";
import { Recipe } from "./recipe";

import { defineAction } from "astro:actions";

import { IMAGE_DIRECTORY } from "astro:env/server";
import { z } from "astro:schema";
import fs from "fs/promises";

import { db } from "@db/index";
import { recipe } from "@db/schema/recipe";

export const server = {
  Recipe,
  ingredient,
  uploadImage: defineAction({
    input: z.object({
      image: z
        .object({
          name: z.string(),
          data: z.instanceof(Uint8Array),
        })
        .array(),
    }),
    handler: async ({ image }) => {
      for (let x = 0; x < image.length; x++) {
        console.log("writing: " + image[x]);
        await fs.writeFile(
          `${IMAGE_DIRECTORY}/${image[x].name}`,
          image[x].data,
        );
        console.log("wrote: " + image[x].name);
      }
    },
  }),
  create: defineAction({
    accept: "form",
    input: z.object({
      title: z.string(),
      description: z.string(),
    }),
    handler: async ({ title, description }) => {
      console.log("adding recipe");
      const res = await db
        .insert(recipe)
        .values({
          title,
          description,
          author: "No Author yet",
          body: "",
          image: "/default.png",
          imageAlt: "Default Image",
        })
        .returning();

      console.log("done?");

      return res[0].id;
    },
  }),
};
