import React, { useCallback } from 'react'
import axios from 'axios'

const useServices = () => {
  const [redy, setRedy] = React.useState(false)
  const getAllProduct = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/product/')
      setRedy(true)
      return data
    } catch (e) {
      console.log(e.message)
      setRedy(true)
    }
  }, [])
  const getProduct = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`/api/product/${id}`)
      setRedy(true)
      return data
    } catch (e) {
      console.log(e.message)
      setRedy(true)
    }
  }, [])

  return {
    getAllProduct,
    getProduct,
    redy,
  }
}
export default useServices
