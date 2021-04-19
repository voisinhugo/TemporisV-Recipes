import { createReducer } from "typesafe-actions";
import { Recipe } from "../../api/sheets/Recipes";
import { RecipeActions } from "./actions";

export interface RecipeState {
  value?: Recipe[];
  timestamp?: number;
}

export const initialState = {};

export const recipeReducer = createReducer<RecipeState, RecipeActions>(
  initialState,
  {
    SET_RECIPES: (state, action) => ({
      ...state,
      value: action.payload,
    }),
  }
);
