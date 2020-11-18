import React from 'react'
import { Container } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { CartPage, Footer, Header, HomePage, ProductPage, SingIn } from '..'

import './app.css'

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/product/:id" exact>
            <ProductPage />
          </Route>

          <Route path="/login" component={SingIn} />
          <Route path="/cart" exact>
            <CartPage />
          </Route>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
