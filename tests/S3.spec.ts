import { doesBucketExist, fetcher, getFileUrl, uploader } from "@lib/files/S3";
import fs from "fs/promises";
import { expect, expectTypeOf, test } from "vitest";

const isURL =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

test("Does bucket exist", async () => {
  const res1 = await doesBucketExist();
  const res2 = await doesBucketExist("astro-chef");
  const res3 = await doesBucketExist("non-existent-bucket");

  expect(res1).toBe(true);
  expect(res2).toBe(true);
  expect(res3).toBe(false);
});

test("Get Url from S3", async () => {
  const res = await getFileUrl("default.png");
  expect(res).toMatch(isURL);
});

test("Fetch via S3", async () => {
  const res = await fetcher("default.png");
  expectTypeOf(res).toBeArray;
});

test("Upload via S3", async () => {
  const file = await fs.readFile("./public/default.png");
  const res = await uploader(file, "default.png");
  expect(res).toBe(true);
});
