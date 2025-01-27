import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const PWD = process.env.POSTGRES_PASSWORD;
const USER = process.env.POSTGRES_USER;

const prod = process.env.DBURL_PROD;
const dev = `postgres://${USER}:${PWD}@localhost:5432`;

const db = process.env.PROD === "true" ? prod : dev;

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: db!,
  },
});
