import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, useHistory } from 'react-router-dom'
import { CartPage, Footer, Header, HomePage, ProductPage, Login, ProfilePage } from '..'
import ErrorBoundry from '../errorBoundry/error-boundry'

import './app.css'
import { useSelector } from 'react-redux';
import Switch from 'react-bootstrap/Switch';
import ProtectRoute from '../router/ProtecRoute';

function App() {
const history = useHistory()
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
              <Route path="/login" component={ Login }/>
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
