import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Select from "react-select";
import { theme } from "../../../../theme";

interface OptionType {
  label: string;
  value: string;
}

interface Props {
  options: OptionType[];
  onFieldSelect: (selectedValue: string | null) => void;
}

const StyledSelect = styled(Select)`
  margin: ${theme.margin.x1}px;
`;

export const SearchBar: FunctionComponent<Props> = ({
  options,
  onFieldSelect,
  ...props
}) => (
  <StyledSelect
    options={options}
    noOptionsMessage={({ inputValue }: { inputValue: string }) =>
      `Pas de résultats pour ${inputValue}.`
    }
    placeholder="Rechercher..."
    onChange={(selectedOption: OptionType, { action }: { action: string }) => {
      if (action === "select-option") {
        onFieldSelect(selectedOption.value);
      } else if (action === "clear") {
        onFieldSelect(null);
      }
    }}
    isClearable
    resultLimit={10}
    {...props}
  />
);
