import * as React from "react";
import { createContext } from "react";
import {
  useAllCharacters,
  type UseAllCharactersReturn,
} from "../hooks/useAllCharacters";

export interface ProviderProps {
  children?: React.ReactNode;
}

export const CharacterContext = createContext<UseAllCharactersReturn>({
  characters: [],
  searchInputValue: "",
  page: 1,
  total: 1,
  isLoading: false,
  isError: false,
  setPage: () => {},
  handleChangeSearchInputValue: () => {},
  searchCharacterByName: () => {},
  resetSearch: () => {},
  changeEditedCharacter: () => {},
});

export const PositionsContextProvider = ({ children }: ProviderProps) => {
  const params = useAllCharacters();

  return (
    <CharacterContext.Provider value={params}>
      {children}
    </CharacterContext.Provider>
  );
};
