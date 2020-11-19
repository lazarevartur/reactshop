import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { CardItem } from '../..'
import useServices from '../../../hooks/useServices'
const HomePage = () => {
  const [product, setProduct] = useState([])
  const { getAllProduct, redy } = useServices()
  useEffect(() => {
    const fetch = async () => {
      const data = await getAllProduct()
      setProduct(data)
    }
    fetch()
  }, [getAllProduct])
  if (!redy) return 'loading...'
  return (
    <>
      <Row>
        {product.map((item) => {
          return (
            <Col key={item._id} sm={12} md={6} lg={4}>
              <CardItem {...item} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default HomePage
