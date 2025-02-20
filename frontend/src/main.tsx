import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Playground from './pages/Playground'
import Agents from './pages/Agents'
import PlaygroundHistory from './pages/Playground-history'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playground />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/playground-history" element={<PlaygroundHistory />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)