import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import type { PgSelect } from "drizzle-orm/pg-core";

import * as ingredients from "./schema/ingredients.ts";
import * as recipes from "./schema/recipe.ts";

const schema = { ...recipes, ...ingredients };

const PWD = process.env.POSTGRES_PASSWORD;
const USER = process.env.POSTGRES_USER;

const dburl = `postgres://${USER}:${PWD}@localhost:5432`;

const tmp_db = drizzle(dburl, {
  schema: schema,
});

export const db = tmp_db;

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = 10,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
