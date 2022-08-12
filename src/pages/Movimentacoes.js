import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-v1-default-rtdb.firebaseio.com/mymoney/'
const { useGet, usePost, useDelete } = Rest(baseURL)

const Movimentacoes = (props) => {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const mes = useParams()
  const data = useGet(`movimentacoes/${mes.data}`)
  const [postData, salvar] = usePost(`movimentacoes/${mes.data}`)
  const [removeData, remover] = useDelete()

  const onChangeDescricao = (evt) => {
    setDescricao(evt.target.value)
  }
  const onChangeValor = (evt) => {
    setValor(evt.target.value)
  }
  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      }),
        setDescricao(''),
        setValor(''),
        data.refetch()
    }
  }
  const removerMovimentacao = async (id) => {
    await remover(`movimentacoes/${mes.data}/${id}`)
    data.refetch()
  }

  return (
    <div className="container">
      <h1>Movimentações</h1>
      <table className="table">
        <thead>
          <tr>
            <th>descrição</th>
            <th>Valor</th>
            <th>Opção</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object.keys(data.data).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{data.data[movimentacao].descricao}</td>
                  <td>{data.data[movimentacao].valor}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removerMovimentacao(movimentacao)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              )
            })}
          <tr>
            <td>
              <input
                type="text"
                value={descricao}
                onChange={onChangeDescricao}
              />
            </td>
            <td>
              <input type="text" value={valor} onChange={onChangeValor} />
              <button className="btn btn-success" onClick={salvarMovimentacao}>
                Salvar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Movimentacoes
