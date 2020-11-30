import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormInput } from '../../index';

const ProfilePage = () => {
  const formHandler = (e) => {
    e.preventDefault()
    console.log(1)
  }
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        <Form onSubmit={ formHandler }>
          <FormInput
            name='Name'
            placeholder="Enter your name"
          />
          <FormInput
            name='Email Address'
            typeInput='email'
            placeholder="Email"
            description='Well never share your email with anyone else.' />
          <FormInput
            name='Password'
            typeInput='password'
            placeholder="password"
          />
          <FormInput
            name='Confirm password'
            typeInput='password'
            placeholder="password"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col cm={9}>
        <h1>Your Orders</h1>
      </Col>

    </Row>

  )
}

export default ProfilePage;
