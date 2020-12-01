import React, { useEffect, useState } from 'react';
import { Login, Registration } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, userCleanError } from '../../redux/action/authAction';

const Auth = (props) => {

  const dispatch = useDispatch()
  const [typeModal, setTypeModal] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {loading, error, userInfo} = useSelector(state => state.userLogin)
  const typeModalHandler = (type) => {
    setTypeModal(type)
  }
  useEffect(() => {
    if (userInfo) {
      props.onHide()
    }
  },[userInfo])
  useEffect(() => {
    if (error) {
      dispatch(userCleanError())
    }
  },[typeModal, props.show])
  const inputHandler = (e) => {
    switch (e.target.type) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'text':
        setName(e.target.value)
        break
    }
  }
  const formHandler = (e) => {
    e.preventDefault()
    const data = {email, password, name}
    dispatch(!name ? login(data) : register(data))
    setEmail('')
    setPassword('')
    setName('')
  }
  return (
    <>
      {typeModal === 'login' ?
        <Login {...props}
               setType={typeModalHandler}
               handler={inputHandler}
               formHandler={formHandler}
               email={email}
               password={password}
               loading={loading}
               error={error}

        /> :
        <Registration {...props}
                      setType={typeModalHandler}
                      handler={inputHandler}
                      formHandler={formHandler}
                      name={name}
                      email={email}
                      password={password}
        />}
    </>
  )
}
export default Auth;
