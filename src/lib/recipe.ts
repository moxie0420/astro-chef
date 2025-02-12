import { recipe } from "@db/schema/recipe";

type filters = "liked";
type sorting = "by-id" | "popular" | "random" | "title";

type Recipe = typeof recipe.$inferSelect;

export type { filters, Recipe, sorting };
