import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Recipe } from "../api/sheets/Recipes";
import { theme } from "../theme";

interface Props {
  recipe: Recipe;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 25%;
  max-width: 50%;
  background-color: ${theme.color.elevation_01};
  margin: ${theme.margin.x1}px;
  padding: ${theme.margin.x2}px;
  padding-top: 0px;
  border-radius: 4px;
  box-shadow: 4px 4px ${theme.color.secondary};
`;

const ItemTitle = styled.h2`
  color: ${theme.color.white};
  margin-top: ${theme.margin.x2}px;
  margin-bottom: ${theme.margin.x1}px;
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
