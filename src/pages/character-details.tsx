import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useCharacter } from "../hooks/useCharacter";
import { normalizeCharacter } from "../helpers/character";
import { CharacterContext } from "../contexts/CharacterContext";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { changeEditedCharacter } = useContext(CharacterContext);

  const [saving, setSaving] = useState(false);

  const {
    character,
    saveEditedCharacter,
    resetEditedFields,
    editCharacter,
    isLoading,
    isError,
  } = useCharacter(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!character) {
      return;
    }
    editCharacter(
      normalizeCharacter({
        ...character,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSave = () => {
    if (!character || !id) return;
    setSaving(true);
    saveEditedCharacter();
    changeEditedCharacter(character, id);
    setTimeout(() => setSaving(false), 500);
  };

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "60vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (isError || !character) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Character not found</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Character Details
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(character).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                name={key}
                value={value}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
              data-testid="save_button"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetEditedFields}
            >
              Reset
            </Button>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CharacterDetail;
