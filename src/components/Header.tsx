import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Section } from "../App";
import { theme } from "../theme";
import DiceLogo from "../assets/dice_logo.png";

export const HEADER_HEIGHT = 65;

interface Props {
  listOfSections: Section[];
  indexOfSelectedSection: number | null;
  changeIndexOfSelected: (index: number | null) => void;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: ${theme.color.black};
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Logo = styled.img`
  margin-left: ${theme.margin.x3}px;
  margin-right: ${theme.margin.x2}px;
  cursor: pointer;
`;

const SectionTitle = styled.h2(
  ({ isSelected }: { isSelected: boolean }) => `
  color: ${isSelected ? theme.color.primary : theme.color.white};
  margin: ${theme.margin.x2}px;
  cursor: pointer;
`
);

export const Header: FunctionComponent<Props> = ({
  listOfSections,
  indexOfSelectedSection,
  changeIndexOfSelected,
}) => (
  <Container>
    <Logo src={DiceLogo} onClick={() => changeIndexOfSelected(null)} />
    {listOfSections.map((section, index) => (
      <SectionTitle
        isSelected={indexOfSelectedSection === index}
        onClick={() => changeIndexOfSelected(index)}
        key={section.label}
      >
        {section.label}
      </SectionTitle>
    ))}
  </Container>
);
