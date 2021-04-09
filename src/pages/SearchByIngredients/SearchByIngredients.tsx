import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mockedRecipes } from "../../api/sheets/mockedRecipes";
import { Recipe } from "../../api/sheets/Recipes";
import { Loader } from "../../components/Loader";
import { theme } from "../../theme";
import { unique } from "../../utils/unique";
import { RecipeCard } from "../../components/RecipeCard";
import { IngredientSelector } from "./components/IngredientSelector";
import { getAllRecipes } from "../../api/sheets/getAllRecipes";
import { doesIncludeAll } from "./utils";

const NUMBER_OF_INGREDIENTS = 5;

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
  const [selectedIngredients, setSelectedIngredients] = useState<
    (string | null)[]
  >(new Array(NUMBER_OF_INGREDIENTS).fill(null));

  // List of the ingredients in recipes and not yet selected
  const ingredients = unique(
    recipes
      ?.reduce<string[]>((curr, recipe) => curr.concat(recipe.ingredients), [])
      .filter((ingredient) => !selectedIngredients.includes(ingredient))
  );

  // The possible recipes have all the selected ingredients in their ingredients
  const possibleRecipes = recipes?.filter(({ ingredients }) => {
    return doesIncludeAll(
      ingredients,
      selectedIngredients.filter(Boolean) as string[]
    );
  });

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
            {selectedIngredients.map((_, index) => (
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
