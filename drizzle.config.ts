import type { Config } from "drizzle-kit";
const config: Config = {
  dialect: "sqlite",
  schema: "./schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: "database.db", // 👈 this could also be a path to the local sqlite file
  },
};

export default config;
