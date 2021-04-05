export const mapStringToOption = (value: string) => ({
  label: value,
  value,
});

export const doesIncludeAll: <T>(arrayToCheck: T[], values: T[]) => boolean = (
  arrayToCheck,
  values
) => !values.map((value) => arrayToCheck.includes(value)).includes(false);
