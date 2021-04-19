import { RootState } from "../reducers";

export const getIngredientSelector = (state: RootState) =>
  state.ingredients.value;

export const getIngredientStringSelector = (state: RootState) =>
  state.ingredients.value?.map(({ name }) => name);
