export const unique: <T>(array?: T[]) => T[] | undefined = (array) =>
  array?.filter((v, i, a) => a.indexOf(v) === i);

export const uniqueWithObject: <T>(
  array: T[],
  comparisonFunc: (a: T, b: T) => boolean
) => T[] = (array, comparisonFunc) =>
  array.filter((v1, i, a) => a.findIndex((v2) => comparisonFunc(v1, v2)) === i);
