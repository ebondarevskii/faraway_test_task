import { useState, useEffect } from "react";

import type {
  Character,
  CharacterApiResult,
  CharacterShort,
  SearchCharacterApiResult,
} from "../types/character";

import { API_URL } from "../constants";
import { searchCharacterAdapter } from "../helpers/character";
import { replaceCharactersFromLS } from "../helpers/localStorage";

export const PAGE_SIZE = 10;

export interface UseAllCharactersReturn {
  characters: CharacterShort[];
  searchInputValue: string;
  page: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  setPage: (page: number) => void;
  handleChangeSearchInputValue: (name: string) => void;
  searchCharacterByName: (pageNumber: number) => void;
  resetSearch: () => void;
  changeEditedCharacter: (character: Character, id: string) => void;
}

export const useAllCharacters = (): UseAllCharactersReturn => {
  const [characters, setCharacters] = useState<CharacterShort[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCharacters = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const url = `${API_URL}/people/?page=${pageNumber}&limit=${PAGE_SIZE}`;

      const res = await fetch(url);

      const data: CharacterApiResult = await res.json();

      const editedCharacters = replaceCharactersFromLS(data.results);

      setCharacters(editedCharacters);

      setTotal(data.total_records);
    } catch (e) {
      setCharacters([]);
      setTotal(0);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const searchCharacterByName = async (pageNumber: number) => {
    if (!searchInputValue) {
      fetchCharacters(1);
      setPage(1);
      return;
    }

    setIsLoading(true);

    try {
      const url = `${API_URL}/people/?name=${searchInputValue}&page=${pageNumber}&limit=${PAGE_SIZE}`;

      const res = await fetch(url);

      const data: SearchCharacterApiResult = await res.json();

      const formattedData = searchCharacterAdapter(data.result);

      setCharacters(formattedData);

      setTotal(data?.result.length);
    } catch (e) {
      setCharacters([]);
      setTotal(0);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSearchInputValue = (name: string) => {
    setSearchInputValue(name);
  };

  const resetSearch = () => {
    fetchCharacters(1);
    setSearchInputValue("");
  };

  const changeEditedCharacter = (character: Character, id: string) => {
    const newCharacters = characters.map((item) => {
      if (item.uid === id) {
        return { uid: id, name: character.name };
      }
      return item;
    });
    setCharacters(newCharacters);
  };

  useEffect(() => {
    if (searchInputValue) {
      searchCharacterByName(page);
    } else {
      fetchCharacters(page);
    }
  }, [page]);

  return {
    characters,
    searchInputValue,
    page,
    total,
    isLoading,
    isError,
    setPage,
    handleChangeSearchInputValue,
    searchCharacterByName,
    resetSearch,
    changeEditedCharacter,
  };
};
