import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthorization } from '../../../../hooks/useAuthorization'
import { useSelector } from 'react-redux'
import { Message } from '../../../index'


const RegistrationPage = ({history, location}) => {
  const {inputHandler, formHandler, name} = useAuthorization()
  const { error, userInfo} = useSelector(state => state.userLogin)
  React.useEffect(() => {
    if (userInfo) {
      const shipping = location.search.split('=')[1]
      shipping ? history.push('/shipping') : history.goBack()
    }
  }, [userInfo])
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={ 6 }>
          <h1>Registration</h1>
          { error && <Message variant='danger'>{ error }</Message> }
          <Form onSubmit={ formHandler } id='registration'>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter your name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={inputHandler}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={ inputHandler }/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={ inputHandler }/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out"/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Link className='float-md-right p-3' to='/login'>Login</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationPage
