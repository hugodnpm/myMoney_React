import React from 'react'
import { Link } from 'react-router-dom'
import Rest from '../../utils/rest'

const baseURL = 'https://mymoney-v1-default-rtdb.firebaseio.com/mymoney/'
const { useGet } = Rest(baseURL)

const Meses = () => {
  const data = useGet('meses')
  if (data.loading) {
    return <span>Carregando...</span>
  }
  if (Object.keys(data.data).length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão Entrada</th>
            <th>Entradas</th>
            <th>Previsão Saída</th>
            <th>Saídas</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data.data).map((mes) => {
            return (
              <tr key={mes}>
                <td>
                  <Link to={`/movimentacoes/${mes}`}>{mes}</Link>
                </td>
                <td>{data.data[mes].previsao_ent}</td>
                <td>{data.data[mes].entradas}</td>
                <td>{data.data[mes].previsao_sai}</td>
                <td>{data.data[mes].saidas}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
export default Meses
