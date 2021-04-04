import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Recipe } from "../api/sheets/Recipes";
import { theme } from "../theme";

interface Props {
  recipe: Recipe;
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  max-width: 50%;
  background-color: ${theme.color.elevation_01};
  margin: ${theme.margin.x1}px;
  padding: ${theme.margin.x2}px;
  border-radius: 10px;
`;

const ItemTitle = styled.h2`
  color: ${theme.color.primary};
`;

const IngredientText = styled.p`
  color: ${theme.color.white};
`;

const CommentText = styled.p`
  color: ${theme.color.white};
`;

export const RecipeCard: FunctionComponent<Props> = ({ recipe }) => (
  <Container>
    <ItemTitle>{recipe.item}</ItemTitle>
    <IngredientText>
      <b>Ingrédients : </b>
      {recipe.ingredients.join(", ")}
    </IngredientText>
    {recipe.comment && (
      <CommentText>
        <b>Commentaires : </b>
        {recipe.comment}
      </CommentText>
    )}
  </Container>
);
