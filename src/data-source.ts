import { uuid_ossp } from "@electric-sql/pglite/contrib/uuid_ossp";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { PGliteDriver } from "typeorm-pglite";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/Recipe";

const PGLite_internal = new DataSource({
  type: "postgres",
  driver: new PGliteDriver({
    extensions: { uuid_ossp },
    database: process.env.DATABASE_URL ?? "./recipes-db",
  }).driver,
  synchronize: true,
  logging: true,
  entities: [Ingredient, Recipe],
});

export const PGLite = await PGLite_internal.initialize();
