import React, { FunctionComponent } from "react";
import { SearchBar } from "../SearchBar";
import { mapStringToOption } from "../../utils";

interface Props {
  index: number;
  ingredients: string[];
  selectedIngredients: string[];
  onSelectedIngredientsChange: (ingredients: string[]) => void;
}

export const IngredientSelector: FunctionComponent<Props> = ({
  index,
  ingredients,
  selectedIngredients,
  onSelectedIngredientsChange,
  ...props
}) => (
  <SearchBar
    options={
      ingredients
        ? (selectedIngredients[index]
            ? [selectedIngredients[index]].concat(ingredients)
            : ingredients
          ).map(mapStringToOption)
        : []
    }
    onFieldSelect={(ingredient) => {
      const copy = [...selectedIngredients];
      copy[index] = ingredient;
      onSelectedIngredientsChange(copy);
    }}
    {...props}
  />
);
