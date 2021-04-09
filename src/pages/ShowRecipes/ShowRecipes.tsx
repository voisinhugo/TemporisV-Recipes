import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { getAllRecipes } from "../../api/sheets/getAllRecipes";
import { mockedRecipes } from "../../api/sheets/mockedRecipes";
import { Recipe } from "../../api/sheets/Recipes";
import { Loader } from "../../components/Loader";
import { theme } from "../../theme";
import { RecipeCard } from "../../components/RecipeCard";
import { TextInput } from "../../components/TextInput";
import { stringContain } from "../../utils/stringContain";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.color.elevation_00};
  padding: ${theme.margin.x3}px;
  padding-top: ${theme.margin.x1}px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${theme.margin.x2}px;
  margin-right: ${theme.margin.x2}px;
`;

const Title = styled.h1`
  color: ${theme.color.primary};
`;

const StyledTextInput = styled(TextInput)`
  width: 20%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ErrorMessage = styled.h4`
  margin-top: ${theme.margin.x5}px;
  margin-left: ${theme.margin.x2}px;
  color: ${theme.color.white};
`;

export const ShowRecipes: FunctionComponent = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  const filteredRecipes = recipes?.filter((recipe) =>
    stringContain(recipe.item, filterText)
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
      <HeaderContainer>
        <Title>Recette connues</Title>
        <StyledTextInput
          onValueChange={setFilterText}
          value={filterText}
          placeholder="Filtrer par"
        />
      </HeaderContainer>
      {isLoading ? (
        <Loader />
      ) : filteredRecipes?.length === 0 ? (
        <ErrorMessage>
          Désolé, nous ne connaissons pas de recette pour cet item...
        </ErrorMessage>
      ) : (
        <ListContainer>
          {filteredRecipes?.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </ListContainer>
      )}
    </Container>
  );
};
