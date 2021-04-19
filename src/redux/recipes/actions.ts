import { action, ActionType } from "typesafe-actions";
import { Recipe } from "../../api/sheets/Recipes";

export const setRecipesToStore = (recipes: Recipe[]) =>
  action("SET_RECIPES", recipes);

const actions = {
  setRecipesToStore,
};

export type RecipeActions = ActionType<typeof actions>;
