import axios from "axios";
import { Recipe } from "../sheets/Recipes";
import { Ingredient } from "./getAllIngredients";
import { Item } from "./getAllItems";

const URL = "https://chinq.fr/api/recipes";

interface RequestRecipe {
  itemId: number;
  cards: number[];
  isCertified: boolean;
}

interface GetRecipesResponse {
  recipes: RequestRecipe[];
}

export const getAllChinqfrRecipes = async (
  ingredients: Ingredient[],
  items: Item[]
) => {
  try {
    const res = await axios.post<GetRecipesResponse>(URL, {});
    const recipes = res.data.recipes;
    const certifiedRecipes = recipes; //.filter((recipe) => recipe.isCertified);
    const enrichedRecipes = certifiedRecipes.map(({ itemId, cards }) => ({
      item: items.find((item) => item.id === itemId)?.name,
      ingredients: ingredients
        .filter((ingredient) => cards.includes(ingredient.id))
        .map((card) => card.name),
    }));
    return enrichedRecipes.filter((recipe) => !!recipe.item) as Recipe[];
  } catch (err) {
    console.error(err);
  }
};
