// import axios from 'axios'

// const useServices = () => {
//   const getAllProduct = async () => {
//     try {
//       const { data } = await axios.get('/api/product/')
//       setRedy(true)
//       return data
//     } catch (e) {
//       setError(e.message)
//       console.log(e.message)
//     }
//   }
//   const getProduct = useCallback(async (id) => {
//     try {
//       const { data } = await axios.get(`/api/product/${id}`)
//       setRedy(true)
//       return data
//     } catch (e) {
//       setError(e.message)
//       console.log(e.message)
//       setRedy(true)
//     }
//   }, [])

//   return {
//     getAllProduct,
//     getProduct,
//     redy,
//     error,
//   }
// }
// export default useServices
