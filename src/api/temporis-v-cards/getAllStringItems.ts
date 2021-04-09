import { getAllItems } from "./getAllItems";

export const getAllStringItems = async () => {
  const items = await getAllItems();
  return items?.map(({ name }) => name);
};
