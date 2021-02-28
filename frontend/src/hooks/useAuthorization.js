import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/action/authAction'

export const useAuthorization = () => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

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
    dispatch(e.target.id === 'signIn' ? login(data) : register(data))
    setEmail('')
    setPassword('')
    setName('')
  }
  return {
    inputHandler,
    formHandler,
    name
  }
}