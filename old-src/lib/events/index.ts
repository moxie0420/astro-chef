import EventEmitter from "events";

export type update_t = "refetch";

export interface RecipeEvents {
  update: [ServerEvent];
}

export interface ServerEvent {
  type: update_t;
}

const RecipeEventEmitter = new EventEmitter<RecipeEvents>();

/**
 * Get the Astro Chef EventEmitter
 * @returns
 */
export const getEventEmitter = () => RecipeEventEmitter;

/**
 * Encode a Server event
 * @param data A message to encode
 * @returns
 */
export function toEncodedStr(data: ServerEvent) {
  const encoder = new TextEncoder();
  return encoder.encode(
    JSON.stringify({
      data: data,
    }),
  );
}

/**
 * Create a Readable Stream
 * @param EventEmitter
 * @returns
 */
export const createReadable = (EventEmitter: EventEmitter<RecipeEvents>) => {
  return new ReadableStream({
    async start(controller) {
      EventEmitter.on("update", (type) =>
        controller.enqueue(toEncodedStr(type)),
      );
    },
  });
};
