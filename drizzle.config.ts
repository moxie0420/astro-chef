import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const PWD = process.env.POSTGRES_PASSWORD;
const USER = process.env.POSTGRES_USER;
const HOST = process.env.DB_HOST;

const db = `postgres://${USER}:${PWD}@${HOST}:5432`;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: db,
  },
});
