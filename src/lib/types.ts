const Units = [
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

type unit =
  | ""
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

export { Units, type unit };
