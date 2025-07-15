import { useEffect, useState } from "react";

import type { Character } from "../types/character";

import { API_URL } from "../constants";
import {
  getEditedCharacterLS,
  setEditedCharacterLS,
} from "../helpers/localStorage";

interface UseFetchCharacterReturn {
  character: Character | null;
  isError: boolean;
  isLoading: boolean;
  saveEditedCharacter: () => void;
  editCharacter: (character: Character) => void;
  resetEditedFields: () => void;
}

export const useCharacter = (id?: string): UseFetchCharacterReturn => {
  const [fetchedCharacter, setFetchedCharacter] = useState<Character | null>(
    null
  );

  const [character, setCharacter] = useState<Character | null>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCharacter = async () => {
    if (!id) return;

    try {
      setIsLoading(true);

      setIsError(false);

      const res = await fetch(`${API_URL}/people/${id}`);

      const json = await res.json();

      if (!json.result) throw new Error("Not found");

      const char: Character = json.result.properties;

      const editedCharacter = getEditedCharacterLS(id);

      if (editedCharacter) {
        setCharacter(editedCharacter);
      } else {
        setCharacter(char);
      }

      setFetchedCharacter(char);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetEditedFields = () => {
    setCharacter(fetchedCharacter);
  };

  const saveEditedCharacter = () => {
    if (!character || !id) return;
    setEditedCharacterLS(character, id);
  };

  const editCharacter = (newCharacter: Character) => {
    setCharacter(newCharacter);
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  return {
    character,
    isError,
    isLoading,
    saveEditedCharacter,
    editCharacter,
    resetEditedFields,
  };
};
