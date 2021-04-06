import React, { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { Header, HEADER_HEIGHT } from "./components/Header";
import { ShowRecipes } from "./pages/ShowRecipes";
import SideImage from "./assets/nebula.jpg";
import { SearchByIngredients } from "./pages/SearchByIngredients";
import { AddRecipe } from "./pages/AddRecipe";

export interface Section {
  label: string;
  component: ReactNode;
}

const SECTIONS: Section[] = [
  { label: "Liste des recettes", component: <ShowRecipes /> },
  { label: "Chercher par ingrédients", component: <SearchByIngredients /> },
  { label: "Ajouter une recette", component: <AddRecipe /> },
];

const BodyContainer = styled.div`
  display: flex;
  margin-top: ${HEADER_HEIGHT}px;
`;

const LateralPanel = styled.img`
  display: flex;
  position: fixed;
  height: 100%;
  width: 20%;
  object-fit: cover;
`;

const LeftPanel = styled(LateralPanel)`
  left: 0;
  object-position: left;
`;
const RightPanel = styled(LateralPanel)`
  right: 0;
  object-position: right;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: 20%;
  margin-right: 20%;
`;

const App: FunctionComponent = () => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  return (
    <div>
      <Header
        listOfSections={SECTIONS}
        indexOfSelectedSection={selectedSectionIndex}
        changeIndexOfSelected={setSelectedSectionIndex}
      />
      <BodyContainer>
        <LeftPanel src={SideImage} />
        <SectionContainer>
          {SECTIONS[selectedSectionIndex].component}
        </SectionContainer>
        <RightPanel src={SideImage} />
      </BodyContainer>
    </div>
  );
};

export default App;
