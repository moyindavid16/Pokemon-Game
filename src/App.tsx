import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Game from "./pages/Game";
import HowToPlay from "./pages/HowToPlay";
import MainMenu from "./pages/MainMenu";

export default function App() {
  const [resetKey, setResetKey] = useState(Date.now());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<Game />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
    </BrowserRouter>
  );
}
