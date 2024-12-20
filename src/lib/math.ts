function truncate(num: number, places: number) {
  return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

export { truncate };
