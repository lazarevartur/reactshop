import React, { useEffect, useState } from 'react'
import { FormContainer } from '../../index'
import StepList from '../../StepList/StepList'
import { useDispatch, useSelector } from 'react-redux'
import { cartChangeCheckOutPage, cartSavePaymentMethod } from '../../../redux/action/cartAction'
import { Button, Col, Form } from 'react-bootstrap'

const PaymentPage = ({history}) => {
  const cart = useSelector((state) => state.cart)
  const {checkoutPage, paymentMethod} = cart.checkout
  const [payMethod, setPayMethod] = useState(paymentMethod)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(cartChangeCheckOutPage(2))
  }, [])
  const formHandler = (e) => {
    e.preventDefault()
    dispatch(cartSavePaymentMethod(payMethod))
    dispatch(cartChangeCheckOutPage(checkoutPage + 1))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <StepList current={ checkoutPage }/>
      <h1>PAYMENT METHOD</h1>
      <Form onSubmit={ formHandler }>
        <Form.Group>
          <Form.Label as="legend">
            Select Method
          </Form.Label>
          <Col sm={ 10 }>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              name="paymentMethod"
              id="PayPal"
              value='PayPal'
              defaultChecked={ paymentMethod === 'PayPal' }
              onChange={ (e) => setPayMethod(e.target.value) }
            />
            <Form.Check
              type="radio"
              label="Stripe"
              name="paymentMethod"
              id="Stripe"
              value='Stripe'
              defaultChecked={ paymentMethod === 'Stripe' }
              onChange={ (e) => setPayMethod(e.target.value) }
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
