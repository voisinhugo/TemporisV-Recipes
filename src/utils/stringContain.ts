import { stripDiacritics } from "react-select/src/diacritics";

export const stringContain = (base: string, str: string) =>
  stripDiacritics(base.toLowerCase()).includes(
    stripDiacritics(str.toLowerCase())
  );
