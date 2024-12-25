import { Recipe } from "./recipe";
import { ingredient } from "./ingredient";

import { defineAction } from "astro:actions";

import { z } from "astro:schema";
import { IMAGE_DIRECTORY } from "astro:env/server";
import fs from "fs/promises";
import { lists } from "./lists";

import { db } from "@db/index";
import { recipe, list } from "@db/schema";

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
        await fs.writeFile(
          `${IMAGE_DIRECTORY}/${image[x].name}`,
          image[x].stream()
        );
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
