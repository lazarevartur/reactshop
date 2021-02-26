import React from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Message } from '../index'

const OrderSummary = ({
                        totalPriceItems,
                        shippingPrice,
                        tax,
                        totalPrice,
                        Button,
                        error,
                      }) => {
  const isEmptyCart = false
  const handlerForm = () => null
  return (
    <Card>
      <ListGroup variant={ 'flush' }>
        <ListGroup.Item>
          <h2>ORDER SUMMARY</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              Items
            </Col>
            <Col>
              ${ totalPriceItems }
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              Shipping
            </Col>
            <Col>
              ${ shippingPrice }
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              Tax
            </Col>
            <Col>
              ${ tax }
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              Total
            </Col>
            <Col>
              ${ totalPrice }
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type={ 'button' }
            className='btn btn-block'
            disabled={ isEmptyCart }
            onClick={ handlerForm }
          >Place Order</Button>
        </ListGroup.Item>
        { error && <Message>{ error }</Message> }
      </ListGroup>
    </Card>
  )
}

export default OrderSummary
