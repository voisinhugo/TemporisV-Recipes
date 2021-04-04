export interface Recipe {
  ingredients: string[],
  item: string,
  comment: string | null,
}

export const mapRowToRecipe = (row: string[]): Recipe => ({
  ingredients: row.slice(0,5),
  item: row[5],
  comment: row[6] || null,
})
