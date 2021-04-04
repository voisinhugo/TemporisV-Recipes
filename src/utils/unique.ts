export const unique: <T>(array?: T[]) => T[] | undefined = (array) =>
  array?.filter((v, i, a) => a.indexOf(v) === i);
