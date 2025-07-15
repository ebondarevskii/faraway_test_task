import type {
  Character,
  CharacterShort,
  SearchCharacter,
} from "../types/character";

export const searchCharacterAdapter = (
  characters: SearchCharacter[]
): CharacterShort[] => {
  return characters.map((item) => ({
    uid: item.uid,
    name: item.properties.name,
  }));
};

export const normalizeCharacter = (obj: Partial<Character>): Character => {
  return {
    created: obj.created ?? "",
    edited: obj.edited ?? "",
    name: obj.name ?? "",
    gender: obj.gender ?? "",
    skin_color: obj.skin_color ?? "",
    hair_color: obj.hair_color ?? "",
    height: obj.height ?? "",
    eye_color: obj.eye_color ?? "",
    mass: obj.mass ?? "",
    homeworld: obj.homeworld ?? "",
    birth_year: obj.birth_year ?? "",
    url: obj.url ?? "",
  };
};
