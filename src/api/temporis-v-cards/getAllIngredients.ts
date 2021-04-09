import axios from "axios";

const API_URL =
  "https://raw.githubusercontent.com/StonyTV/dofus-temporis-v-cards/main/db.json";

enum IngredientColor {
  CLASSIC = "Classique",
  RARE = "Rare",
  UNKNOWN = "Inconnu",
}

enum IngredientType {
  HEART = "Coeur",
  DIAMOND = "Carreau",
  CLUB = "Trèfle",
  BONUS = "Bonus",
  SPADE = "Pique",
  FRAGMENT = "Fragment",
}

enum IngredientProfession {
  ALCHEMIST = "Alchimiste",
  WOODSMAN = "Bûcheron",
  HUNTER = "Chasseur",
  MINOR = "Mineur",
  FARMER = "Paysan",
  FISHERMAN = "Pêcheur",
  JEWELLER = "Bijoutier",
  HANDYMAN = "Bricoleur",
  SHOEMAKER = "Cordonnier",
  MOULDER = "Façonneur",
  SMITH = "Forgeron",
  SCULPTOR = "Sculpteur",
  TAILOR = "Tailleur",
  MONSTER = "Monstres",
  BOSS = "Boss",
  UNKNOWN = "Inconnu",
}

interface RequestIngredient {
  id: number;
  name: string;
  color: IngredientColor;
  type: IngredientType;
  profession: IngredientProfession;
  level: number;
}

interface GetIngredientsResponse {
  _info: string;
  indexDB: RequestIngredient[];
}

export const getAllIngredients = async () => {
  try {
    const res = await axios.get<GetIngredientsResponse>(API_URL);
    const ingredientList = res.data.indexDB;
    return ingredientList.map((ingredient) => ingredient.name);
  } catch (err) {
    console.error(err);
  }
};
