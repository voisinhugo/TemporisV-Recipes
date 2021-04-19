import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { TextInput } from "../../components/TextInput";
import { getIngredientSelector } from "../../redux/ingredients/selectors";
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
  const [filterText, setFilterText] = useState("");
  const ingredients = useSelector(getIngredientSelector);
  const isLoading = !ingredients;

  const filteredIngredients = ingredients?.filter(({ name }) =>
    stringContain(name, filterText)
  );

  return (
    <Container>
      <HeaderContainer>
        <Title>Liste des cartes</Title>
        <StyledTextInput
          onValueChange={setFilterText}
          value={filterText}
          placeholder="Filtrer par"
        />
      </HeaderContainer>
      {isLoading ? (
        <Loader />
      ) : filteredIngredients?.length === 0 ? (
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
