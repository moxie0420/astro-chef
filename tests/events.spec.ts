import EventEmitter from "events";
import {
  createReadable,
  getEventEmitter,
  toEncodedStr,
  type RecipeEvents,
  type ServerEvent,
} from "src/lib/events";
import { expect, expectTypeOf, test } from "vitest";

const decoder = new TextDecoder();

const testData: ServerEvent = { type: "refetch" };

test("get EventEmitter", () => {
  const res = getEventEmitter();
  expectTypeOf(res).toMatchTypeOf(new EventEmitter<RecipeEvents>());
});

test("Sends Correct SSE", () => {
  const res = toEncodedStr(testData);
  const decoded = decoder.decode(res);
  expect(decoded).toBe(`{"data":{"type":"refetch"}}`);
});

test("Can create Readable stream", () => {
  const ee = getEventEmitter();
  const res = createReadable(ee);
  ee.emit("update", { type: "refetch" });
  expectTypeOf(res).toMatchTypeOf(new ReadableStream<any>());
});
