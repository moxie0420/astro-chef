export const truncate = (number: number, places: number) => {
  const multiplier = Math.pow(10, Math.abs(places));
  const adjusted = number * multiplier;
  const truncated = Math[number < 0 ? "ceil" : "floor"](adjusted);
  return truncated / multiplier;
};

export function shuffle<T>(input: T[]): T[] {
  for (let i = input.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = input[i];
    input[i] = input[j];
    input[j] = temp;
  }
  return input;
}
