import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartChangeCheckOutPage } from '../../../redux/action/cartAction'
import StepList from '../../StepList/StepList'
import { Message } from '../../index'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { OrderItems } from '../../orderItems'

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart
  const {checkoutPage, paymentMethod, shippingAddress} = cart.checkout
  const isEmptyCart = cartItems.length === 0
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(cartChangeCheckOutPage(3))
  }, [])

  const totalPrice = (() => {
    return  cartItems.reduce((sum, product) => {
      return sum + (product.price * product.qty)
    },0)
  })()
  return (
    <>
      <Row className='justify-content-center'>
        <Col md={ 6 }>
          <StepList current={ checkoutPage }/>
        </Col>
      </Row>
      <Row>
        <Col md={ 8 }>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>Address: { shippingAddress.address }, { shippingAddress.city } { shippingAddress.postalCode }, { shippingAddress.country }</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>Method: { paymentMethod }</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              { isEmptyCart ? <Message variant='info'> You cart is empty </Message> :
                <ListGroup variant={ 'flush' }>
                  {
                    cartItems.map((product) => <OrderItems key={ product._id } { ...product } { ...dispatch } />)
                  }
                </ListGroup>
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={ 4 }>
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
                    {cartItems.length}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Shipping
                  </Col>
                  <Col>
                   $0,00
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Tax
                  </Col>
                  <Col>
                    250
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Total
                  </Col>
                  <Col>
                    {totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type={ 'button' }
                  className='btn btn-block'
                  disabled={ isEmptyCart }
                >Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

  )
}

export default PlaceOrderPage

