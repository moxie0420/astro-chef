import "reflect-metadata";

import { vector } from "@electric-sql/pglite/vector";
import { DataSource } from "typeorm";
import { PGliteDriver } from "typeorm-pglite";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/Recipe";

const PGLite = new DataSource({
  type: "postgres",
  driver: new PGliteDriver({
    dataDir: process.env.DATABASE_URL,
    extensions: {
      vector,
    },
  }).driver,
  synchronize: true,
  entities: [Ingredient, Recipe],
});

await PGLite.initialize();

export { PGLite };
