import React from 'react'
import { Container } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { CartPage, Footer, Header, HomePage, ProductPage, SingIn } from '..'
import ErrorBoundry from '../errorBoundry/error-boundry'

import './app.css'

function App() {
  return (
    <>
      <Header/>
      <ErrorBoundry>
        <main className="py-3">
          <Container>
            <Route path="/" exact>
              <HomePage/>
            </Route>
            <Route path="/product/:id" component={ ProductPage }/>
            <Route path="/cart/:id" component={ CartPage }/>
            <Route path="/cart" component={ CartPage } exact/>
            <Route path="/login" component={ SingIn }/>
          </Container>
        </main>
      </ErrorBoundry>
      <Footer/>
    </>
  )
}

export default App
