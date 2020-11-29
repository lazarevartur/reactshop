import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { en } from '../../language/language'
import {  Auth } from '../index';

const { title, singIn, cart } = en


const Header = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const openModal = (e) => {
    e.target.blur()
    setModalShow(!modalShow)
  }
  return (
    <>
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
        <Container>
          <LinkContainer to="/" exact>
            <Navbar.Brand>{title}</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" activeKey>
              <LinkContainer to="/" exact>
                <Nav.Link>
                  <i className="fas fa-user px-1"/>
                  Home
                </Nav.Link>
              </LinkContainer>
                <Nav.Link onClick={openModal}>
                  <i className="fas fa-user px-1"/>
                  {singIn}
                </Nav.Link>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-1"/>
                  {cart}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
      <Auth show={modalShow}
             onHide={() => setModalShow(!modalShow)}/>
    </>
  )

}

export default Header
