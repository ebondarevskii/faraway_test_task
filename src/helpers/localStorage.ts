import { LS_CHARACTER_KEY } from "../constants";
import type { Character, CharacterShort } from "../types/character";

import type { EditedCharactersMap } from "../types/localStorage";

export const getEditedCharacterLS = (id: string) => {
  const editedCharactersMap = localStorage.getItem(LS_CHARACTER_KEY);

  const parsed: EditedCharactersMap = JSON.parse(editedCharactersMap || "{}");

  return parsed?.[id];
};

export const setEditedCharacterLS = (character: Character, id: string) => {
  const editedCharactersMap = localStorage.getItem(LS_CHARACTER_KEY);

  const parsed: EditedCharactersMap = JSON.parse(editedCharactersMap || "{}");

  localStorage.setItem(
    LS_CHARACTER_KEY,
    JSON.stringify({ ...parsed, [id]: character })
  );
};

export const replaceCharactersFromLS = (characters: CharacterShort[]) => {
  const editedCharactersMap = localStorage.getItem(LS_CHARACTER_KEY);

  const parsed: EditedCharactersMap = JSON.parse(editedCharactersMap || "{}");

  return characters.map((item) => {
    const lsCharacter = parsed?.[item.uid];

    if (lsCharacter) {
      return { uid: item.uid, name: lsCharacter.name };
    }

    return item;
  });
};
