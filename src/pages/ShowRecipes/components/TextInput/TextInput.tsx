import React, { ChangeEvent, FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../../../theme";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

const TextField = styled.input`
  width: 20%;
  height: 30px;
  border-radius: 8px;
  padding-left: 8px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1pt ${theme.color.primary};
  }
`;

export const TextInput: FunctionComponent<Props> = ({
  value,
  onValueChange,
}) => {
  const onChange = (event: ChangeEvent<{ value: string }>) => {
    onValueChange(event.target.value);
  };
  return (
    <TextField onChange={onChange} value={value} placeholder="Filtrer par" />
  );
};
