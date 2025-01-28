import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import type { PgSelect } from "drizzle-orm/pg-core";

import * as ingredients from "./schema/ingredients";
import * as recipes from "./schema/recipe";

const schema = { ...recipes, ...ingredients };

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = 10,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
