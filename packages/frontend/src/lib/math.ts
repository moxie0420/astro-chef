export const truncate = (number: number, places: number) => {
  const multiplier = Math.pow(10, Math.abs(places));
  const adjusted = number * multiplier;
  const truncated = Math[number < 0 ? 'ceil' : 'floor'](adjusted);
  return truncated / multiplier;
};
