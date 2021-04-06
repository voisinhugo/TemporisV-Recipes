/* global gapi */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoogleLoginButton } from "../../api/sheets/auth/GoogleLoginButton";
import { GoogleLogoutButton } from "../../api/sheets/auth/GoogleLogoutButton";
import { initSheetAPI } from "../../api/sheets/initSheetAPI";
import { theme } from "../../theme";
import { Button } from "../../components/Button";
import { getEmptyRecipe, Recipe } from "../../api/sheets/Recipes";
import { appendRecipe } from "../../api/sheets/appendRecipe";
import { TextInput } from "../../components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  margin: ${theme.margin.x3}px;
`;

const LoggedInContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
`;

const LoggedInHeader = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

const LoggedInTitle = styled.h2`
  display: flex;
  color: ${theme.color.primary};
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

const StyledTextInput = styled(TextInput)`
  display: flex;
  margin-top: ${theme.margin.x1}px;
  margin-bottom: ${theme.margin.x1}px;
  margin-left: ${theme.margin.x2}px;
  margin-right: ${theme.margin.x2}px;
`;

const BottomButtonsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  margin-top: ${theme.margin.x3}px;
`;

const LoggedOutContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const LoginTitle = styled.h2`
  display: flex;
  color: ${theme.color.white};
`;

const LoginButtonContainer = styled.div`
  display: flex;
  margin-top: ${theme.margin.x3}px;
  justify-content: center;
`;

export const AddRecipe = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [recipe, setRecipe] = useState<Recipe>(getEmptyRecipe());
  console.log(recipe);

  useEffect(() => initSheetAPI(updateSignInStatus), []);

  const updateSignInStatus = (loginStatus: boolean) => {
    console.log(isLoggedIn);
    setIsLoggedIn(loginStatus);
  };

  const appendValues = () => {
    if (recipe.item) appendRecipe(recipe, onAppenedValues);
  };

  const resetValue = () => {
    setRecipe(getEmptyRecipe());
  };

  const onAppenedValues = () => {
    toast.success("Recette ajoutée ! 🚀");
  };

  return (
    <Container>
      {isLoggedIn ? (
        <LoggedInContainer>
          <ToastContainer />
          <LoggedInHeader>
            <LoggedInTitle>Ajouter une recette</LoggedInTitle>
            <GoogleLogoutButton />
          </LoggedInHeader>
          <InputsContainer>
            {recipe.ingredients.map((ingredient, index) => (
              <StyledTextInput
                placeholder={`Ingrédient ${index + 1}`}
                value={ingredient}
                onValueChange={(newIngredient) => {
                  const newIngredients = [...recipe.ingredients];
                  newIngredients[index] = newIngredient;
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
              />
            ))}
            <StyledTextInput
              placeholder="Item obtenu"
              value={recipe.item}
              onValueChange={(item) => {
                setRecipe({ ...recipe, item });
              }}
            />
            <StyledTextInput
              placeholder="Commentaires (facultatif)"
              value={recipe.comment || ""}
              onValueChange={(comment) => {
                setRecipe({ ...recipe, comment });
              }}
            />
          </InputsContainer>
          <BottomButtonsContainer>
            <Button onClick={appendValues}>Ajouter cette recette</Button>
            <Button onClick={resetValue}>Réinitialiser</Button>
          </BottomButtonsContainer>
        </LoggedInContainer>
      ) : (
        <LoggedOutContainer>
          <LoginTitle>
            Pour ajouter une recette, veuillez vous connecter à un compte
            Google :
          </LoginTitle>
          <LoginButtonContainer>
            <GoogleLoginButton />
          </LoginButtonContainer>
        </LoggedOutContainer>
      )}
    </Container>
  );
};
