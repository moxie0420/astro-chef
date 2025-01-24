const Units: unit[] = [
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

export const isMetric = /(gram|liter)/;

export const isRecipePage = /^\/recipes[\/](by-id|by-name)/gm;

export { Units, type filter_t, type sort_t, type unit };
