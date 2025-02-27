import { PGLite } from "src/data-source";
import { Ingredient } from "src/entity/Ingredient";
import { Recipe } from "src/entity/Recipe";
import { getSorting } from "src/entity/Recipe/helpers";
import { DataSource } from "typeorm";
import { expect, test } from "vitest";

test("Can create Recipe Entity", () => {
  const res = new Recipe();
  expect(res).toBeInstanceOf(Recipe);
});

test("Can transform sorting properly", () => {
  const res1 = getSorting("by-id");
  const res2 = getSorting("popular");
  const res3 = getSorting("title");

  expect(res1).toHaveProperty("id");
  expect(res1.id).toBe("ASC");

  expect(res2).toHaveProperty("views");
  expect(res2.views).toBe("DESC");

  expect(res3).toHaveProperty("title");
  expect(res3.title).toBe("ASC");
});

test("Can create Ingredient", () => {
  const res = new Ingredient();
  expect(res).toBeInstanceOf(Ingredient);
});

test("Can crate PGLite data source", () => {
  expect(PGLite).toBeInstanceOf(DataSource);
});
