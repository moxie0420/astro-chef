type filter_t = "liked";

type sort_t = "by-id" | "popular" | "random" | "title";

type unit =
  | "none"
  | "teaspoon"
  | "tablespoon"
  | "cup"
  | "ounce"
  | "fluid cup"
  | "fluid ounce"
  | "pint"
  | "quart"
  | "gallon"
  | "kilogram"
  | "gram"
  | "miligram";

const Units: unit[] = [
  "none",
  "teaspoon",
  "tablespoon",
  "cup",
  "ounce",
  "fluid cup",
  "fluid ounce",
  "pint",
  "quart",
  "gallon",
  "kilogram",
  "gram",
  "miligram",
];

const isMetric = /(gram|liter)/;

const isRecipePage = /^\/recipes[\/](by-id|by-name)/gm;

type Recipe = {
  id: number;
  title: string;
  author: string;
  created?: Date;
  edited?: Date;
  prepTime: string;
  cookTime: string;
  description: string;
  body: string;
  image: string;
  imageAlt: string;
  liked: boolean;
  totalViews: number;
};

export { Units, isMetric, isRecipePage };
export type { Recipe, filter_t, sort_t, unit };
