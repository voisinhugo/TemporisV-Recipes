import { RootState } from "../reducers";

export const getIngredientStringSelector = (state: RootState) =>
  state.ingredients.value?.map(({ name }) => name);
