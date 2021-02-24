import React from 'react'
import { Container } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import {
  CartPage,
  Footer,
  Header,
  HomePage,
  ProductPage,
  LoginPage,
  ProfilePage,
  ShippingPage,
  RegistrationPage,
} from '..'
import ErrorBoundry from '../errorBoundry/error-boundry'

import './app.css'
import { useSelector } from 'react-redux';
import Switch from 'react-bootstrap/Switch';
import ProtectRoute from '../router/ProtecRoute';
import { PaymentPage } from '../page/paymentPage'
import { PlaceOrderPage } from '../page/placeOrderPage'


function App() {
  return (
    <>
      <Header/>
      <ErrorBoundry>
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/product/:id" component={ ProductPage }/>
              <Route path="/cart/:id" component={ CartPage }/>
              <Route path="/cart" component={ CartPage } exact/>
              <Route path="/login" component={ LoginPage }/>
              <Route path="/registration" component={ RegistrationPage }/>
              <ProtectRoute path="/shipping" component={ ShippingPage }/>
              <ProtectRoute path="/payment" component={ PaymentPage }/>
              <ProtectRoute path="/placeorder" component={ PlaceOrderPage }/>
              <ProtectRoute path='/profile' exact component={ ProfilePage } />
            </Switch>
          </Container>
        </main>
      </ErrorBoundry>
      <Footer/>
    </>
  )
}

export default App
