import { RootState } from "../reducers";

export const getRecipesSelector = (state: RootState) => state.recipes.value;
