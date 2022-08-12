import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movimentacoes from './pages/Movimentacoes'
import Header from './elements/Header'
// assistir aula 09 Adicionar e remover movimentação
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/movimentacoes/:data" element={<Movimentacoes />} />
      </Routes>
    </Router>
  )
}

export default App
