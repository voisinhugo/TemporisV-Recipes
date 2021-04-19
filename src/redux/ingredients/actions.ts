import { action, ActionType } from "typesafe-actions";
import { Ingredient } from "../../api/temporis-v-cards/getAllIngredients";

export const setIngredientsToStore = (ingredients: Ingredient[]) =>
  action("SET_INGREDIENTS", ingredients);

const actions = {
  setIngredientsToStore,
};

export type IngredientActions = ActionType<typeof actions>;
