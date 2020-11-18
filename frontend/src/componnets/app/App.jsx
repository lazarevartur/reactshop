import React from 'react'
import { Container } from 'react-bootstrap'
import { Footer, Header, HomePage } from '..'
import './app.css'

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Wellcom to shop</h1>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
