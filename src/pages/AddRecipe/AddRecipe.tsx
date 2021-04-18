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
import { SearchBar } from "../SearchByIngredients/components/SearchBar";
import { getAllIngredients } from "../../api/temporis-v-cards/getAllIngredients";
import { mapStringToSearchBarOption } from "../SearchByIngredients/components/SearchBar/utils";
import { getAllStringItems } from "../../api/temporis-v-cards/getAllStringItems";
import { Loader } from "../../components/Loader";

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
  color: ${theme.color.white};
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin-top: ${theme.margin.x5}px;
  margin-bottom: ${theme.margin.x5}px;
`;

const commonInputStyle = `
display: flex;
flex: 1;
min-width: 200px;
margin-top: ${theme.margin.x3}px;
margin-bottom: ${theme.margin.x3}px;
margin-left: ${theme.margin.x2}px;
margin-right: ${theme.margin.x2}px;`;

const StyledSearchBar = styled(SearchBar)`
  ${commonInputStyle}
  height: 42px;
`;

const StyledTextInput = styled(TextInput)`
  ${commonInputStyle}
  height: 36px;
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
  const [ingredients, setIngredients] = useState<string[] | undefined>();
  const [items, setItems] = useState<string[] | undefined>();
  console.log(recipe);

  const isLoading = !ingredients || !items || isLoggedIn === null;

  useEffect(() => {
    initSheetAPI(updateSignInStatus);
    updateIngredients();
    updateItems();
  }, []);

  const updateSignInStatus = (loginStatus: boolean) => {
    console.log(isLoggedIn);
    setIsLoggedIn(loginStatus);
  };

  const updateIngredients = async () => {
    const ingredientList = await getAllIngredients();
    setIngredients(ingredientList?.map((ingredient) => ingredient.name));
  };

  const updateItems = async () => {
    const itemList = await getAllStringItems();
    setItems(itemList);
  };

  const appendValues = () => {
    if (recipe.item) appendRecipe(recipe, onAppenedValues);
  };

  const resetValues = () => {
    setRecipe(getEmptyRecipe());
  };

  const onAppenedValues = () => {
    toast.success("Recette ajoutée ! 🚀");
    resetValues();
  };

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : isLoggedIn ? (
        <LoggedInContainer>
          <ToastContainer />
          <LoggedInHeader>
            <LoggedInTitle>Ajouter une recette</LoggedInTitle>
            <GoogleLogoutButton />
          </LoggedInHeader>
          <InputsContainer>
            {ingredients &&
              recipe.ingredients.map((ingredient, index) => (
                <StyledSearchBar
                  placeholder={`Carte ${index + 1}`}
                  value={
                    ingredient ? mapStringToSearchBarOption(ingredient) : null
                  }
                  options={ingredients?.map(mapStringToSearchBarOption)}
                  onFieldSelect={(newIngredient) => {
                    const newIngredients = [...recipe.ingredients];
                    newIngredients[index] = newIngredient || "";
                    setRecipe({ ...recipe, ingredients: newIngredients });
                  }}
                  innerStyle={{ width: "100%" }}
                />
              ))}
            {items && (
              <StyledSearchBar
                placeholder="Item obtenu"
                value={
                  recipe.item ? mapStringToSearchBarOption(recipe.item) : null
                }
                options={items?.map(mapStringToSearchBarOption)}
                onFieldSelect={(item) => {
                  setRecipe({ ...recipe, item: item || "" });
                }}
                innerStyle={{ width: "100%" }}
              />
            )}
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
            <Button onClick={resetValues}>Réinitialiser</Button>
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
