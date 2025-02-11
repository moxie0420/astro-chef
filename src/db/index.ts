import "dotenv/config";

import { PGlite } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite/vector";
import type { PgSelect } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/pglite";

import * as ingredients from "./schema/ingredients.ts";
import * as recipes from "./schema/recipe.ts";

const schema = { ...recipes, ...ingredients };

console.log(`loading db @ ${process.env.DATABASE_URL}`);

const client = new PGlite(process.env.DATABASE_URL!, {
  extensions: {
    vector,
  },
});

export const listen = client.listen;

export const db = drizzle({ schema: schema, client });

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = 10,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
