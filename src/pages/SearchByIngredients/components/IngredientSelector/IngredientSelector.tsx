import React, { FunctionComponent } from "react";
import { SearchBar } from "../SearchBar";
import { mapStringToOption } from "../../utils";

interface Props {
  index: number;
  ingredients: string[];
  selectedIngredients: (string | null)[];
  onSelectedIngredientsChange: (ingredients: (string | null)[]) => void;
}

export const IngredientSelector: FunctionComponent<Props> = ({
  index,
  ingredients,
  selectedIngredients,
  onSelectedIngredientsChange,
  ...props
}) => {
  // The user can select the unselected ingredients + the ingredient selected by this input
  const selectableIngredients = ingredients
    ? selectedIngredients[index]
      ? ([selectedIngredients[index]].concat(ingredients) as string[])
      : ingredients
    : [];

  const onChange = (ingredient: string | null) => {
    const copy = [...selectedIngredients];
    copy[index] = ingredient;
    onSelectedIngredientsChange(copy);
  };

  return (
    <SearchBar
      options={selectableIngredients.map(mapStringToOption)}
      onFieldSelect={onChange}
      {...props}
    />
  );
};
