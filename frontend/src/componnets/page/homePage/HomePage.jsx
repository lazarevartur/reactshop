import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { CardItem } from '../..'
import products from '../../../products'

const HomePage = () => {
  return (
    <>
      <Row>
        {products.map((item) => {
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
