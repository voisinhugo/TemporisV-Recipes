import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAllIngredients,
  Ingredient,
} from "../../api/temporis-v-cards/getAllIngredients";
import { Loader } from "../../components/Loader";
import { TextInput } from "../../components/TextInput";
import { theme } from "../../theme";
import { stringContain } from "../../utils/stringContain";
import { IngredientCard } from "./components/IngredientCard";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: ${theme.margin.x3}px;
  margin-top: ${theme.margin.x1}px;
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

const IngredientContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const ErrorMessage = styled.h4`
  margin-top: ${theme.margin.x5}px;
  margin-left: ${theme.margin.x2}px;
  color: ${theme.color.white};
`;

export const ShowIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  const filteredIngredients = ingredients?.filter(({ name }) =>
    stringContain(name, filterText)
  );

  useEffect(() => {
    updateIngredients();
  }, []);

  const updateIngredients = async () => {
    const ingredientList = await getAllIngredients();
    setIngredients(ingredientList);
    setIsLoading(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <HeaderContainer>
        <Title>Liste des cartes</Title>
        <StyledTextInput
          onValueChange={setFilterText}
          value={filterText}
          placeholder="Filtrer par"
        />
      </HeaderContainer>
      {filteredIngredients?.length === 0 ? (
        <ErrorMessage>
          Désolé, il n'y a pas de carte correspondant à "{filterText}"...
        </ErrorMessage>
      ) : (
        <IngredientContainer>
          {filteredIngredients?.map((ingredient) => (
            <IngredientCard ingredient={ingredient} />
          ))}
        </IngredientContainer>
      )}
    </Container>
  );
};
