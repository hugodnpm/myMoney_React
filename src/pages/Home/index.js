import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Meses from './Meses'
import AdicionarMes from './AdicionarMes'

const Home = () => {
  return (
    <div>
      <div className="container">
        <AdicionarMes />
        <Meses />
      </div>
    </div>
  )
}
export default Home
