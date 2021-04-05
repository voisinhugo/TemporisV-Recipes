import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mockedRecipes } from "../../api/sheets/mockedRecipes";
import { Recipe } from "../../api/sheets/Recipes";
import { Loader } from "../../components/Loader";
import { theme } from "../../theme";
import { unique } from "../../utils/unique";
import { RecipeCard } from "../../components/RecipeCard";
import { IngredientSelector } from "./components/IngredientSelector";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${theme.color.elevation_00};
  padding: ${theme.margin.x3}px;
  padding-top: ${theme.margin.x1}px;
`;

const SelectorListContainer = styled.div`
  margin-bottom: ${theme.margin.x5}px;
`;

const SelectorTitle = styled.h2`
  color: ${theme.color.primary};
`;

const StyledSelector = styled(IngredientSelector)`
  width: 400px;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: ${theme.color.primary};
`;

export const SearchByIngredients = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const ingredients = unique(
    recipes
      ?.reduce<string[]>((curr, recipe) => curr.concat(recipe.ingredients), [])
      .filter((ingredient) => !selectedIngredients.includes(ingredient))
  );

  const possibleRecipes = recipes?.filter(
    ({ ingredients }) =>
      !selectedIngredients
        .map((selectedIngredient) => ingredients.includes(selectedIngredient))
        .includes(false)
  );

  useEffect(() => {
    const updateRecipes = async () => {
      // const allRecipes = await getAllRecipes();
      const allRecipes = mockedRecipes;
      console.log(allRecipes);

      setRecipes(allRecipes);
      setIsLoading(false);
    };
    updateRecipes();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Title>Chercher par ingrédients</Title>
          <SelectorListContainer>
            {/* @ts-ignore */}
            {[...Array(5).keys()].map((_, index) => (
              <div key={index}>
                <SelectorTitle>Ingrédient {index + 1} :</SelectorTitle>
                <StyledSelector
                  index={index}
                  ingredients={ingredients || []}
                  selectedIngredients={selectedIngredients}
                  onSelectedIngredientsChange={setSelectedIngredients}
                />
              </div>
            ))}
          </SelectorListContainer>
          {possibleRecipes?.length !== 0 && (
            <div>
              <Title>Recette possibles :</Title>
              <RecipeContainer>
                {possibleRecipes?.map((recipe, index) => (
                  <RecipeCard recipe={recipe} key={index} />
                ))}
              </RecipeContainer>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};
