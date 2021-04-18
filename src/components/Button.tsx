import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../theme";

interface Props {
  onClick: () => void;
}

const StyledButton = styled.button`
  display: flex;
  color: ${theme.color.white};
  background-color: ${theme.color.elevation_01};
  border-bottom-color: ${theme.color.secondary};
  border-right-color: ${theme.color.secondary};
  font-size: 20px;
  border-radius: 8px;
  padding-top: ${theme.margin.x1}px;
  padding-bottom: ${theme.margin.x1}px;
  padding-left: ${theme.margin.x2}px;
  padding-right: ${theme.margin.x2}px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Button: FunctionComponent<Props> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);
