import { appendToRange } from "./appendToRange";
import { Recipe } from "./Recipes";

export const appendRecipe = (recipe: Recipe, callback = () => {}) => {
  const values = recipe.ingredients.concat(recipe.item);
  if (recipe.comment) {
    values.push(recipe.comment);
  }
  appendToRange("Recettes!A2:G2", [values], callback);
};
