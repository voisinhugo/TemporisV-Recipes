import axios from "axios";

const API_URL =
  "https://raw.githubusercontent.com/StonyTV/dofus-temporis-v-cards/main/items.json";

enum ItemCategory {
  WEAPON = "Arme",
  EQUIPMENT = "Equipement",
  CONSUMABLE = "Consommable",
  IDOL = "Idole",
}

type ItemType =
  | "Hache"
  | "Pelle"
  | "Épée"
  | "Bâton"
  | "Arc"
  | "Dague"
  | "Baguette"
  | "Marteau"
  | "Faux"
  | "Pioche"
  | "Outil"
  | "Pierre d'âme"
  | "Chapeau"
  | "Amulette"
  | "Ceinture"
  | "Anneau"
  | "Bottes"
  | "Cape"
  | "Bouclier"
  | "Sac à dos"
  | "Dofus"
  | "Trophée"
  | "Objet vivant"
  | "Potion"
  | "Coffre"
  | "Objet d'élevage"
  | "Pain"
  | "Poisson comestible"
  | "Objet utilisable"
  | "Viande comestible"
  | "Boisson"
  | "Boîte de fragments"
  | "Friandise"
  | "Potion de conquête"
  | "Potion de téléportation"
  | "Parchemin de recherche"
  | "Parchemin d'expérience"
  | "Potion de familier"
  | "Fée d'artifice"
  | "Potion d'oubli Percepteur"
  | "Parchemin de caractéristique"
  | "Parchemin d'attitude"
  | "Bière"
  | "Parchemin de sortilège"
  | "Potion de montilier"
  | "Mimibiote"
  | "Conteneur"
  | "Parchemin d'émoticônes"
  | "Parchemin de titre"
  | "Potion de monture"
  | "Potion d'attitude"
  | "Popoche de Havre-Sac"
  | "Mots de haïku"
  | "Pierre magique"
  | "Bourse de Kamas"
  | "Parchemin d'ornement"
  | "Idole";

interface RequestItem {
  id: number;
  name: string;
  imgUrl: string;
  category: ItemCategory;
  type: ItemType;
  level: number;
}

type Item = Omit<RequestItem, "id">;

const mapRequestItemToItem = ({ id, ...rest }: RequestItem): Item => ({
  ...rest,
});

export const getAllItems = async () => {
  try {
    const res = await axios.get<RequestItem[]>(API_URL);
    return res.data.map(mapRequestItemToItem);
  } catch (err) {
    console.error(err);
  }
};
