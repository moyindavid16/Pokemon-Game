import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './pages/Game'
import HowToPlay from './pages/HowToPlay'
import MainMenu from './pages/MainMenu'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/play' element={<Game />} />
        <Route path='/how-to-play' element={<HowToPlay />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
)
