import { action, ActionType } from "typesafe-actions";
import { Item } from "../../api/temporis-v-cards/getAllItems";

export const setItemsToStore = (items: Item[]) => action("SET_ITEMS", items);

const actions = {
  setItemsToStore,
};

export type ItemActions = ActionType<typeof actions>;
