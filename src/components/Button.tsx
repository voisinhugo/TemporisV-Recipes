import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../theme";

interface Props {
  onClick: () => void;
}

const StyledButton = styled.button`
  display: flex;
  color: ${theme.color.primary};
  background-color: ${theme.color.elevation_01};
  font-size: 20px;
  border-radius: 8px;
  padding-top: ${theme.margin.x1}px;
  padding-bottom: ${theme.margin.x1}px;
  padding-left: ${theme.margin.x2}px;
  padding-right: ${theme.margin.x2}px;
  &:focus {
    outline: none;
  }
`;

export const Button: FunctionComponent<Props> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);
