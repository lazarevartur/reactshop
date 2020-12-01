import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormInput, Loader, Message } from '../../index';
import { useDispatch, useSelector } from 'react-redux';
import { profile, updateProfile } from '../../../redux/action/authAction';

const ProfilePage = () => {
  const dispatch = useDispatch()
  const {loading, error, user} = useSelector((state) => state.userDetail)
  const {success} = useSelector((state) => state.userUpdate)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  React.useEffect(() => {
    if (!user) {
      dispatch(profile())
    } else {
      setName(user.name)
      setEmail(user.email)
      setMessage('')
    }

  }, [user])
  const formHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('password not confirm')
      return void 0
    }
    dispatch(updateProfile({
      name,
      email,
      password
    }))
  }
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Update</Message>}
        {loading ? <Loader/> :
          <Form onSubmit={ formHandler }>
            <FormInput
              name='Name'
              value={name}
              handler={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <FormInput
              name='Email Address'
              handler={(e) => setEmail(e.target.value)}
              value={email}
              typeInput='email'
              placeholder="Email"
              description='Well never share your email with anyone else.' />
            <FormInput
              name='Password'
              handler={(e) => setPassword(e.target.value)}
              typeInput='password'
              placeholder="password"
            />
            <FormInput
              name='Confirm password'
              handler={(e) => setConfirmPassword(e.target.value)}
              typeInput='password'
              placeholder="password"
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        }

      </Col>
      <Col cm={9}>
        <h1>Your Orders</h1>
      </Col>
    </Row>

  )
}

export default ProfilePage;
