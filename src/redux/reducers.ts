import { Action, combineReducers } from "redux";
import { recipeReducer, RecipeState } from "./recipes/reducer";
import { ingredientReducer, IngredientState } from "./ingredients/reducer";
import { itemReducer, ItemState } from "./items/reducer";

const appReducer = combineReducers({
  recipes: recipeReducer,
  ingredients: ingredientReducer,
  items: itemReducer,
});

export interface RootState {
  recipes: RecipeState;
  ingredients: IngredientState;
  items: ItemState;
}

type RootReducer = ReturnType<typeof appReducer>;

export const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootReducer => {
  // @ts-ignore
  return appReducer(state, action);
};
