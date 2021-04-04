import { getFromRange } from "./getFromRange";
import { mapRowToRecipe } from "./Recipes";

export const getAllRecipes = async () => {
  const values = await getFromRange("Recettes!A2%3AG100");
  return values?.map(mapRowToRecipe);
}