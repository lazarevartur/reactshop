import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authUser } from '../../../redux/action/authAction';


const Login = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const changeEmail = e => {
    setEmail(e.target.value)
  }
  const changePassword = e => {
    setPassword(e.target.value)
  }
  const formHandler = (e) => {
    e.preventDefault()
    const data = {email, password}
    dispatch(authUser(data))
  }

  return (
    <Modal
      { ...props }
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Authentication
        </Modal.Title>
      </Modal.Header>
      <Container>
      <Row>
        <Col>
          <Modal.Body>
            <Form onSubmit={formHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={changeEmail}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword}/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <a href="#login" className='float-md-right p-3'>registration</a>
            </Form>
          </Modal.Body>
        </Col>
      </Row>
      </Container>
    </Modal>
  );
}

export default Login
