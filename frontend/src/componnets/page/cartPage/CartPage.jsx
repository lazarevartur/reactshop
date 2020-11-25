import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap';

const CartPage = () => {
  return (
    <>
      <Link className="btn btn light my-3" to="/">
        Go Back
      </Link>
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
    </>
  )
}

export default CartPage
