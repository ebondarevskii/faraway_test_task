import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterDetail from "./character-details";
import { CharacterContext } from "../contexts/CharacterContext";
import { MemoryRouter } from "react-router-dom";

const defaultContext = {
  characters: [],
  searchInputValue: "",
  page: 1,
  total: 1,
  isLoading: false,
  isError: false,
  setPage: jest.fn(),
  handleChangeSearchInputValue: jest.fn(),
  searchCharacterByName: jest.fn(),
  resetSearch: jest.fn(),
  changeEditedCharacter: jest.fn(),
};

const defaultCharacter = {
  name: "Luke Skywalker",
  birth_year: "19BBY",
  eye_color: "blue",
  gender: "male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  skin_color: "fair",
  created: "",
  edited: "",
  homeworld: "",
  url: "",
};

jest.mock("../hooks/useCharacter", () => ({
  useCharacter: () => ({
    character: defaultCharacter,
    saveEditedCharacter: jest.fn(),
    fetchCharacter: jest.fn(),
    editCharacter: jest.fn(),
    resetEditedFields: jest.fn(),
    isLoading: false,
    isError: false,
  }),
}));

describe("CharacterDetail", () => {
  it("renders character details", () => {
    render(
      <MemoryRouter>
        <CharacterContext.Provider value={defaultContext}>
          <CharacterDetail />
        </CharacterContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Character Details/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByDisplayValue("19BBY")).toBeInTheDocument();
  });
});
