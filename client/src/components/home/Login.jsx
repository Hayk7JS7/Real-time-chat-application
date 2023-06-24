import React, { useState } from 'react';
import '../../styles/components/home/Register.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeloginState, formLoginSignIn, formPasswordSignIn, loginSubmit, makeInitialStateLoginForm } from '../../features/loginSlice/loginSlice';

const Login = () => {
  const [response, setResponse] = useState('')
  const { login, password } = useSelector(state => state.login)
  const dispatch = useDispatch()

  const regexGeneral = /^[a-zA-Z0-9_]{3,20}$/
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const handleSubmit = (e) => {
    e.preventDefault()
    setResponse('')
    if(regexGeneral.test(login) && regexPassword.test(password)){
    const formData = {
      login: login,
      password: password,
    };
    dispatch(loginSubmit(formData))
      .then(() => {
        dispatch(makeInitialStateLoginForm())
        dispatch(closeloginState())
      })
    } else {
      setResponse('fill gaps correctyle')
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit} className="auth-form-container">
      <h2>Login</h2>
      <label htmlFor="login">Login</label>
          <input type="text" placeholder="Login..." name="login" id="login" value={login} onChange={(e) => dispatch(formLoginSignIn(e.target.value))}/>
        <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password..." name="password" id="password" value={password} onChange={(e) => dispatch(formPasswordSignIn(e.target.value))}/>
        <h3>{response}</h3>
      <button>Sign In</button>
    </form>
  );
}

export default Login
