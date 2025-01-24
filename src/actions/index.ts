import { ingredient } from "./ingredient";
import { Recipe } from "./recipe";

import { defineAction } from "astro:actions";

import { IMAGE_DIRECTORY } from "astro:env/server";
import { z } from "astro:schema";
import fs from "fs/promises";
import { lists } from "./lists";

import { db } from "@db/index";
import { recipe } from "@db/schema";

export const server = {
  Recipe,
  ingredient,
  lists,
  uploadImage: defineAction({
    accept: "form",
    input: z.object({
      image: z.array(z.instanceof(File)),
    }),
    handler: async ({ image }) => {
      for (let x = 0; x < image.length; x++) {
        console.log("writing: " + image[x].name);
        await fs.writeFile(
          `${IMAGE_DIRECTORY}/${image[x].name}`,
          image[x].stream(),
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

      return res[0].id;
    },
  }),
};
