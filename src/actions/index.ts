import { ingredient } from "./ingredient";
import { Recipe } from "./recipe";

import { defineAction } from "astro:actions";

import { z } from "astro:schema";

import { db } from "@db/index";
import { recipe } from "@db/schema/recipe.ts";

export const server = {
  Recipe,
  ingredient,
  create: defineAction({
    input: z.object({
      title: z.string(),
      author: z.string(),
      description: z.string(),
    }),
    handler: async ({ title, author, description }) => {
      console.log("adding recipe");
      const res = await db
        .insert(recipe)
        .values({
          title,
          description,
          author: author,
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
