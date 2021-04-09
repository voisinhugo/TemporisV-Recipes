import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Ingredient } from "../../../../api/temporis-v-cards/getAllIngredients";
import { theme } from "../../../../theme";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${theme.color.elevation_01};
  margin: ${theme.margin.x1}px;
  padding: ${theme.margin.x2}px;
  border-radius: 10px;
`;

const Title = styled.h2`
  color: ${theme.color.primary};
`;

const PropertiesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${theme.margin.x2}px;
`;

const Text = styled.p`
  color: ${theme.color.white};
`;

interface Props {
  ingredient: Ingredient;
}

export const IngredientCard: FunctionComponent<Props> = ({
  ingredient,
  ...props
}) => (
  <Container {...props}>
    <Title>{ingredient.name}</Title>
    <PropertiesContainer>
      <Text>
        <b>Couleur : </b>
        {ingredient.type}
      </Text>
      <Text>
        <b>Rareté : </b>
        {ingredient.color}
      </Text>
      <Text>
        <b>Obtention : </b>
        {ingredient.profession}
      </Text>
      <Text>
        <b>Niveau : </b>
        {ingredient.level}
      </Text>
    </PropertiesContainer>
  </Container>
);
