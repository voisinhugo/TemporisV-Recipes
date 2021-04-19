import React, { useState } from "react";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { theme } from "../../theme";
import { unique } from "../../utils/unique";
import { RecipeCard } from "../../components/RecipeCard";
import { IngredientSelector } from "./components/IngredientSelector";
import { doesIncludeAll } from "./utils";
import { useSelector } from "react-redux";
import { getRecipesSelector } from "../../redux/recipes/selectors";

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
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: ${theme.margin.x5}px;
`;

const SelectorTitle = styled.h2`
  color: ${theme.color.white};
`;

const StyledSelector = styled(IngredientSelector)`
  width: 400px;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: ${theme.color.white};
`;

export const SearchByIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    (string | null)[]
  >(new Array(NUMBER_OF_INGREDIENTS).fill(null));
  const recipes = useSelector(getRecipesSelector);
  const isLoading = !recipes;

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

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Title>Chercher par carte</Title>
          <SelectorListContainer>
            {selectedIngredients.map((_, index) => (
              <div key={index}>
                <SelectorTitle>Carte {index + 1} :</SelectorTitle>
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
