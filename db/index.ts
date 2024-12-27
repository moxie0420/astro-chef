import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import * as schema from "./schema";

// import seed from "./seed";

import type { PgSelect } from "drizzle-orm/pg-core";

export const db = drizzle(process.env.DATABASE_URL!, { schema });

// seed();

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = 10
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

export function sortBy<T extends PgSelect>(
  qb: T,
  by: "random" | "popular" | "by-id" | "title",
  type: typeof schema.recipe
) {
  switch (by) {
    case "by-id":
      return qb.orderBy(type.id);
    case "popular":
      return qb.orderBy(type.totalViews);
    case "random":
      return qb.orderBy(sql`random()`);
    case "title":
      return qb.orderBy(type.title);
  }
}

export function filterByLiked<T extends PgSelect>(
  qb: T,
  type: typeof schema.recipe
) {
  return qb.where(eq(type.liked, true));
}

export function recipeSearch<T extends PgSelect>(qb: T, search: string) {
  return qb.where(
    sql`to_tsvector('english', ${schema.recipe.title}) @@ to_tsquery('english', ${search})`
  );
}
