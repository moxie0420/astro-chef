const truncate = (num: number, places: number) =>
  Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);

export { truncate };
