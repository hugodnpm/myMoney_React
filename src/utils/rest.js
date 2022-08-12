import axios from 'axios'
import { useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  loading: false,
  data: {}
}

const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  return state
}

const init = (baseURL) => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const carregar = async () => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.get(baseURL + resource + '.json')
      dispatch({ type: 'SUCCESS', data: res.data })
    }

    useEffect(() => {
      carregar()
    }, [resource])
    return {
      ...data,
      refetch: carregar
    }
  }
  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const post = async (data) => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.post(baseURL + resource + '.json', data)
      dispatch({ type: 'SUCCESS', data: res.data })
      console.log(res.data)
    }
    return [data, post]
  }

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const remove = async (resource) => {
      dispatch({ type: 'REQUEST' })
      await axios.delete(baseURL + resource + '.json')
      dispatch({ type: 'SUCCESS' })
    }
    return [data, remove]
  }

  return { useGet, usePost, useDelete }
}

export default init
