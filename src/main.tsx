import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PositionsContextProvider } from "./contexts/CharacterContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PositionsContextProvider>
      <App />
    </PositionsContextProvider>
  </StrictMode>
);
