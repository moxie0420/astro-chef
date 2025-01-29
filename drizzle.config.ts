import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const PWD = process.env.POSTGRES_PASSWORD;
const USER = process.env.POSTGRES_USER;

const db = `postgres://${USER}:${PWD}@localhost:5432`;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: db,
  },
});
