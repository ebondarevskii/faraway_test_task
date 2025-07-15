import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Pagination,
  CircularProgress,
  Container,
} from "@mui/material";

import { PAGE_SIZE } from "../hooks/useAllCharacters";
import { CharacterContext } from "../contexts/CharacterContext";
import { SearchInput } from "../components/SearchInput";
import { CardsGrid } from "../components/CardsGrid";

const CharacterList: React.FC = () => {
  const {
    characters,
    searchInputValue,
    page,
    total,
    isLoading,
    setPage,
    searchCharacterByName,
    handleChangeSearchInputValue,
    resetSearch,
  } = useContext(CharacterContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchInputValue(e.target.value);
  };

  const handleSearch = () => {
    searchCharacterByName(1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container sx={{ width: "100vw", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Star Wars Characters
      </Typography>
      <Typography variant="h6">Explore the galaxy far, far away...</Typography>
      <Grid container justifyContent="space-between">
        <SearchInput
          handleInputChange={handleInputChange}
          handleInputKeyDown={handleInputKeyDown}
          resetSearch={resetSearch}
          handleSearch={handleSearch}
          searchInputValue={searchInputValue}
        />
      </Grid>
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ mt: 4 }} minHeight={250}>
          <CircularProgress />
        </Grid>
      ) : (
        <CardsGrid characters={characters} />
      )}
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Pagination
          count={searchInputValue ? 1 : Math.ceil(total / PAGE_SIZE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Container>
  );
};

export default CharacterList;
