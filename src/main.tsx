import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Game from "./pages/Game";
import HowToPlay from "./pages/HowToPlay";
import MainMenu from "./pages/MainMenu";
import "./main.css";
import Background from "./Background";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import App from "./App";

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
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
