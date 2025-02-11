import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
