import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../api/sheets/getAllRecipes";
import { setRecipesToStore } from "../redux/recipes/actions";
import { getAllIngredients } from "../api/temporis-v-cards/getAllIngredients";
import { setIngredientsToStore } from "../redux/ingredients/actions";
import { getAllItems } from "../api/temporis-v-cards/getAllItems";
import { setItemsToStore } from "../redux/items/actions";
import { getAllChinqfrRecipes } from "../api/temporis-v-cards/getAllChinqfrRecipes";
import { uniqueWithObject } from "../utils/unique";
import { Recipe } from "../api/sheets/Recipes";

const areRecipesEqual = (rec1: Recipe, rec2: Recipe) =>
  rec1.item === rec2.item &&
  rec1.ingredients.filter((card) => rec2.ingredients.includes(card)).length ===
    5;

export const useSetupData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateStore();
  }, []);

  const updateStore = async () => {
    const ingredients = await getAllIngredients();
    if (!ingredients) return;
    dispatch(setIngredientsToStore(ingredients));

    const items = await getAllItems();
    if (!items) return;
    dispatch(setItemsToStore(items));

    const recipes = await getAllRecipes();
    if (!recipes) return;

    const chinqfrRecipes = await getAllChinqfrRecipes(ingredients, items);

    const allRecipes = chinqfrRecipes
      ? uniqueWithObject<Recipe>(
          recipes.concat(chinqfrRecipes),
          areRecipesEqual
        )
      : recipes;
    allRecipes && dispatch(setRecipesToStore(allRecipes));
  };
};
