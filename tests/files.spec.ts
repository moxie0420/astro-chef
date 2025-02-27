import {
  fetchMultiple,
  fetchSingle,
  uploadMultiple,
  uploadSingle,
} from "@lib/files";
import { fetcher, getFileUrl, uploader } from "@lib/files/S3";
import fs from "fs/promises";
import { expect, expectTypeOf, test } from "vitest";

const isURL =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

test("Fetch single file", async () => {
  const res1 = await fetchSingle("default.png", fetcher);
  const res2 = await fetchSingle("default.png", getFileUrl);
  expectTypeOf(res1).toBeArray;
  expect(res2).toMatch(isURL);
});

test("Fetch multiple files", async () => {
  const res1 = await fetchMultiple(["default.png", "default.png"], fetcher);
  const res2 = await fetchMultiple(["default.png", "default.png"], getFileUrl);

  expectTypeOf(res1).toBeArray;
  res1.forEach((res) => {
    expectTypeOf(res).toBeArray;
  });

  expectTypeOf(res2).toBeArray;
  res2.forEach((res) => {
    expect(res).toMatch(isURL);
  });
});

test("Upload single file", async () => {
  const file = await fs.readFile("./public/default.png");
  const res1 = await uploadSingle(file, "default.png", uploader);
  expect(res1).toBe(true);
});

test("Upload multiple files", async () => {
  const filePaths = [
    "./public/default.png",
    "./public/favicon-16x16.png",
    "./public/favicon-32x32.png",
    "./public/android-chrome-512x512.png",
  ];

  const filePromises = filePaths.map(async (path) => ({
    data: await fs.readFile(path),
    name: path.substring(8),
  }));

  const files = await Promise.all(filePromises);

  const res = await uploadMultiple(files, uploader);
  expectTypeOf(res).toBeArray;
  res.forEach((val) => {
    expect(val).toBe(true);
  });
});
