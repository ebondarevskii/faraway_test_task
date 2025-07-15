import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./pages/character-list";
import CharacterDetail from "./pages/character-details";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
