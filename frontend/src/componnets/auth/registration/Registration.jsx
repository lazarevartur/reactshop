import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Loader, Message } from '../../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Registration = (props) => {
  const {setType, handler, name, email, password, formHandler, ...rest} = props
  const {loading, error} = useSelector(state => state.userRegister)
  return (
    <Modal
      { ...rest }
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Registration
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
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handler}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handler}/>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handler}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Link className='float-md-right p-3' to='#' onClick={ () => setType('login') }>login</Link>
                </Form> }
            </Modal.Body>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default Registration;

