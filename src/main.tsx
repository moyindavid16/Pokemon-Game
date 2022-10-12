import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import HowToPlay from "./pages/HowToPlay";
import MainMenu from "./pages/MainMenu";
import "./main.css";
import Background from "./Background";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*<Background />*/}
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/play" element={<Game />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
