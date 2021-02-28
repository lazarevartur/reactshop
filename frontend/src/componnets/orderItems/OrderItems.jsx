import React from 'react'
import { Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OrderItems = ({_id, name, image, price, qty}) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={ 1 }>
          <Link to={ `/product/${ _id }` }><Image src={ image } alt={ name } fluid/></Link>
        </Col>
        <Col>
          <Link to={ `/product/${ _id }` }>{ name }</Link>
        </Col>
        <Col md={ 4 }>
          { qty } x ${ price } = ${ qty * price }
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default OrderItems
