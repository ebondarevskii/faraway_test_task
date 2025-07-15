import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { CharacterShort } from "../types/character";

interface Props {
  characters: CharacterShort[];
}

export const CardsGrid: React.FC<Props> = ({ characters }) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 2 }}
      alignItems="stretch"
      minHeight={250}
    >
      {characters.map((char) => (
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          key={char.uid}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Card
            sx={{
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => navigate(`/character/${char.uid}`)}
          >
            <CardContent>
              <Typography variant="h6">{char.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
