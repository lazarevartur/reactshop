import React from 'react'
import { Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../..';
import CartItem from './cartItem/CartItem';

const CartPage = ({history}) => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const subtotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.qty
    }, 0)
  }
  const totalPrice = () => {
    return cartItems.reduce((acc, item) => {
      return acc + (item.price * item.qty)
    }, 0).toFixed(2)
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const isEmptyCart = cartItems.length === 0
  return (
    <Row>
      <Col md={ 8 }>
        <h1>Shopping cart</h1>
        <button className='btn light my-3' onClick={ () => history.goBack() }>
          Go Back
        </button>
        { isEmptyCart ? <Message variant='info'> You cart is empty </Message> :
          <ListGroup variant={ 'flush' }>
            {
              cartItems.map((product) => <CartItem key={ product._id } { ...product } { ...dispatch } />)
            }
          </ListGroup>
        }
      </Col>
      <Col md={ 4 }>
        <Card>
          <ListGroup variant={ 'flush' }>
            <ListGroup.Item>
              <h2>Subtotal ({ subtotal() }) items</h2>
              ${ totalPrice() }
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant={ 'flush' }>
            <ListGroup.Item>
              <Button
                type={ 'button' }
                className='btn btn-block'
                disabled={ isEmptyCart }
                onClick={ checkoutHandler }
              >Proceed to Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  )
}

export default CartPage
// TODO загрузка карзины. Добавить лодер
