import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  searchInputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  resetSearch: () => void;
}

export const SearchInput: React.FC<Props> = ({
  searchInputValue,
  handleInputChange,
  handleInputKeyDown,
  handleSearch,
  resetSearch,
}) => {
  return (
    <TextField
      label="Search by name"
      value={searchInputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ gap: 2 }}>
            <button
              onClick={handleSearch}
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 16px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
            <button
              onClick={resetSearch}
              disabled={!searchInputValue}
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 16px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </InputAdornment>
        ),
      }}
    />
  );
};
