import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { CardItem } from '../..'
import { getAllProducts } from '../../../redux/action/productListAction'
import Loader from '../../loader/Loader'
import Message from '../../message/Message'
const HomePage = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state) => state.productsList
  )
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((item) => {
            return (
              <Col key={item._id} sm={12} md={6} lg={4}>
                <CardItem {...item} />
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default HomePage
