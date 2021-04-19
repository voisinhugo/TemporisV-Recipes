import { createReducer } from "typesafe-actions";
import { Ingredient } from "../../api/temporis-v-cards/getAllIngredients";
import { IngredientActions } from "./actions";

export interface IngredientState {
  value?: Ingredient[];
  timestamp?: number;
}

export const initialState = {};

export const ingredientReducer = createReducer<
  IngredientState,
  IngredientActions
>(initialState, {
  SET_INGREDIENTS: (state, action) => ({
    ...state,
    value: action.payload,
  }),
});
