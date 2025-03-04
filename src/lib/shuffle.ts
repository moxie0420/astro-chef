/**
 * Shuffles an array using the Fisher Yates method
 * @param array - The array you want to shuffle
 * @returns
 */
export const fisherYates = <T>(array: Array<T>): Array<T> => {
  array.forEach((point, i, points) => {
    const j = Math.floor(Math.random() * (i + 1));
    const k = point;
    points[i] = points[j];
    points[j] = k;
  });
  return array;
};
