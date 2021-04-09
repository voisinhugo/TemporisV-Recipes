import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${theme.margin.x3}px;
  margin-top: ${theme.margin.x1}px;
`;

const Title = styled.h1`
  color: ${theme.color.primary};
`;

export const Home = () => (
  <Container>
    <Title>Bienvenue sur Recettes Temporis V</Title>
  </Container>
);
