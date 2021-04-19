import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { theme } from "../../theme";
import { RecipeCard } from "../../components/RecipeCard";
import { TextInput } from "../../components/TextInput";
import { stringContain } from "../../utils/stringContain";
import { getRecipesSelector } from "../../redux/recipes/selectors";

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
  color: ${theme.color.white};
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
  const [filterText, setFilterText] = useState("");
  const recipes = useSelector(getRecipesSelector);
  const isLoading = !recipes;

  const filteredRecipes = recipes?.filter((recipe) =>
    stringContain(recipe.item, filterText)
  );

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
