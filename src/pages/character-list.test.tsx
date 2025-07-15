import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { CharacterContext } from "../contexts/CharacterContext";
import CharacterList from "./character-list";

const mockCharacters = [
  { uid: "1", name: "Luke Skywalker" },
  { uid: "2", name: "Leia Organa" },
  { uid: "3", name: "Han Solo" },
  { uid: "4", name: "Darth Vader" },
];

describe("CharacterList", () => {
  const defaultContext = {
    characters: mockCharacters,
    searchInputValue: "",
    page: 1,
    total: 4,
    isLoading: false,
    isError: false,
    setPage: jest.fn(),
    searchCharacterByName: jest.fn(),
    handleChangeSearchInputValue: jest.fn(),
    resetSearch: jest.fn(),
    changeEditedCharacter: jest.fn(),
  };

  it("renders title and subtitle", () => {
    render(
      <MemoryRouter>
        <CharacterContext.Provider value={defaultContext}>
          <CharacterList />
        </CharacterContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Star Wars Characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore the galaxy/i)).toBeInTheDocument();
  });

  it("renders character cards", () => {
    render(
      <MemoryRouter>
        <CharacterContext.Provider value={defaultContext}>
          <CharacterList />
        </CharacterContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();
  });
});
