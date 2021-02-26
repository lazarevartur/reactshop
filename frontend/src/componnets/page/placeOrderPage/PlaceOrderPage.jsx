import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartChangeCheckOutPage } from '../../../redux/action/cartAction'
import StepList from '../../StepList/StepList'
import { Message } from '../../index'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { OrderItems } from '../../orderItems'
import { createOrder } from '../../../redux/action/orderAction'

const PlaceOrderPage = ({history}) => {
  const cart = useSelector((state) => state.cart)
  const {success, error, order} = useSelector((state) => state.orderCreate)
  const {cartItems} = cart
  const {checkoutPage, paymentMethod, shippingAddress} = cart.checkout
  const isEmptyCart = cartItems.length === 0
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cartChangeCheckOutPage(3))
  }, [])
  useEffect(() => {
    if (success) {
      history.push(`/order/${ order._id }`)
    }
  }, [success, history])
  //TODO ПЕРЕДЕЛАТЬ МУТАЦИЯ СТЕТЙТА!!!!
  cart.totalPriceItems = +cartItems.reduce((sum, product) => {
    return sum + (product.price * product.qty)
  }, 0).toFixed(2)
  cart.shippingPrice = cart.totalPriceItems > 100 ? 0 : 100
  cart.tax = +(cart.totalPriceItems * 0.2).toFixed(2)
  cart.totalPrice = +(cart.totalPriceItems + cart.shippingPrice + cart.tax).toFixed(2)

  const handlerForm = () => {
    const newOrder = {
      totalPriceItems: cart.totalPriceItems,
      shippingPrice: cart.shippingPrice,
      tax: cart.tax,
      totalPrice: cart.totalPrice,
      paymentMethod,
      shippingAddress,
      orderItems: cart.cartItems,
    }
    dispatch(createOrder(newOrder))
  }

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
                    ${ cart.totalPriceItems }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Shipping
                  </Col>
                  <Col>
                    ${ cart.shippingPrice }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Tax
                  </Col>
                  <Col>
                    ${ cart.tax }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Total
                  </Col>
                  <Col>
                    ${ cart.totalPrice }
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
              {error && <Message>{error}</Message>}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

  )
}

export default PlaceOrderPage

