import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const minAno = 2022
const maxAno = 2025

const AdicionarMes = () => {
  const refAno = useRef()
  const refMes = useRef()
  const [redir, setRedir] = useState('')
  const anos = []
  const meses = []
  const navigate = useNavigate()

  for (let i = minAno; i <= maxAno; i++) {
    anos.push(i)
  }

  for (let i = 1; i <= 12; i++) {
    meses.push(i)
  }

  const zeroPad = (num) => {
    if (num < 10) {
      return '0' + num
    }
    return num
  }

  const verMes = () => {
    setRedir(refAno.current.value + '-' + refMes.current.value)
  }
  if (redir !== '') {
    return navigate(`/movimentacoes/${redir}`)
  }

  return (
    <React.Fragment>
      <h2>Adicionar Mês</h2>
      <select ref={refAno}>
        {anos.map((ano) => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>
      <select ref={refMes}>
        {meses.map(zeroPad).map((mes) => (
          <option key={mes} value={mes}>
            {mes}
          </option>
        ))}
      </select>
      <button onClick={verMes}>Adicionar Mês</button>
    </React.Fragment>
  )
}

export default AdicionarMes
