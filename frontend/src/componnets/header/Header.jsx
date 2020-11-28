import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { en } from '../../language/language'
import { Login } from '../index';

const { title, singIn, cart } = en

const Header = () => {
  const [modalShow, setModalShow] = React.useState(false);
  console.log(modalShow)

  return (
    <>
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" exact>
            <Navbar.Brand>{title}</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" activeKey={false}>
              <LinkContainer to="/" exact>
                <Nav.Link>
                  <i className="fas fa-user px-1"></i>
                  Home
                </Nav.Link>
              </LinkContainer>
                <Nav.Link onClick={() => setModalShow(true)}>
                  <i className="fas fa-user px-1"></i>
                  {singIn}
                </Nav.Link>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-1"></i>
                  {cart}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
      <Login show={modalShow}
             onHide={() => setModalShow(false)}/>
    </>
  )

}

export default Header
