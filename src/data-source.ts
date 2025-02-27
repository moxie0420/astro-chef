import "reflect-metadata";

import { NodeFS } from "@electric-sql/pglite/nodefs";
import { vector } from "@electric-sql/pglite/vector";
import { DataSource } from "typeorm";
import { PGliteDriver } from "typeorm-pglite";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/Recipe";

const PGLite = new DataSource({
  type: "postgres",
  driver: new PGliteDriver({
    fs: new NodeFS(process.env.DATABASE_URL ?? "./recipes-db"),
    extensions: {
      vector,
    },
  }).driver,
  synchronize: true,
  entities: [Ingredient, Recipe],
});

await PGLite.initialize();

export { PGLite };
