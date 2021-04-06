const NUMBER_OF_INGREDIENTS = 5;

export interface Recipe {
  ingredients: string[];
  item: string;
  comment: string | null;
}

export const mapRowToRecipe = (row: string[]): Recipe => ({
  ingredients: row.slice(0, 5),
  item: row[5],
  comment: row[6] || null,
});

export const getEmptyRecipe = () => ({
  ingredients: new Array(NUMBER_OF_INGREDIENTS).fill(""),
  item: "",
  comment: "",
});
