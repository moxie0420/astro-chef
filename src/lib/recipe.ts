type filters = "liked";
type sorting = "by-id" | "popular" | "title";

const getSorting = (sorting: sorting): { [key: string]: "ASC" | "DESC" } => {
  switch (sorting) {
    case "by-id":
      return { id: "ASC" };
    case "popular":
      return { views: "DESC" };
    case "title":
      return { title: "ASC" };
  }
};

export { getSorting };
export type { filters, sorting };
