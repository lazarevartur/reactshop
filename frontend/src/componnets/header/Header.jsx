import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { en } from '../../language/language'
import { Auth } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/action/authAction'

const {title, singIn, cart} = en


const Header = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const {userInfo} = useSelector(state => state.userLogin)
  const {user} = useSelector(state => state.userDetail)
  useEffect(() => {
    if (userInfo) {
      setName(user ? user.name : userInfo.name)
    }
  }, [userInfo, user])
  const openModal = (e) => {
    e.target.blur()
    setModalShow(true)
  }
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/" exact>
              <Navbar.Brand>{ title }</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" activeKey>
                <LinkContainer to="/" exact>
                  <Nav.Link>
                    <i className="fas fa-user px-1"/>
                    Home
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart px-1"/>
                    { cart }
                  </Nav.Link>
                </LinkContainer>
                {
                  userInfo
                    ? <NavDropdown title={ name } id='userinfo'>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={ logoutHandler }>Logout</NavDropdown.Item>
                    </NavDropdown>
                    :
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-user px-1"/>
                        { singIn }
                      </Nav.Link>
                    </LinkContainer>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Auth show={ modalShow }
            onHide={ () => setModalShow(false) }
      />
    </>
  )
}
export default Header


