import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../api/sheets/getAllRecipes";
import { setRecipesToStore } from "../redux/recipes/actions";
import { getAllIngredients } from "../api/temporis-v-cards/getAllIngredients";
import { setIngredientsToStore } from "../redux/ingredients/actions";
import { getAllItems } from "../api/temporis-v-cards/getAllItems";
import { setItemsToStore } from "../redux/items/actions";

export const useSetupData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateStore();
  }, []);

  const updateStore = async () => {
    const recipes = await getAllRecipes();
    recipes && dispatch(setRecipesToStore(recipes));

    const ingredients = await getAllIngredients();
    ingredients && dispatch(setIngredientsToStore(ingredients));

    const items = await getAllItems();
    items && dispatch(setItemsToStore(items));
  };
};
