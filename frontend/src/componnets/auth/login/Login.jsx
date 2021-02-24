import React from 'react'
import { Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loader, Message } from '../../index';


const Login = (props) => {
  const {setType, handler, email, password, formHandler, loading, error, ...rest} = props
  return (
    <Modal
      { ...rest }
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
              { loading ? <Loader/> :
                <Form onSubmit={ formHandler }>
                  { error && <Message variant='danger'>{ error }</Message> }
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  type="email" placeholder="Enter email" onChange={ handler }/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={ handler }/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Link className='float-md-right p-3' to='#' onClick={ () => setType('reg') }>registration</Link>
                </Form> }
            </Modal.Body>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default Login
