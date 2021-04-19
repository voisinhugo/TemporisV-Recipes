import { createReducer } from "typesafe-actions";
import { Item } from "../../api/temporis-v-cards/getAllItems";
import { ItemActions } from "./actions";

export interface ItemState {
  value?: Item[];
  timestamp?: number;
}

export const initialState = {};

export const itemReducer = createReducer<ItemState, ItemActions>(initialState, {
  SET_ITEMS: (state, action) => ({
    ...state,
    value: action.payload,
  }),
});
