import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRegisterState, formEmail, formLastName, formLogin, formName, formPassword, makeInitialRegisterForm, registerSubmit } from '../../features/registerSlice/registerSlice';
import { openloginState } from '../../features/loginSlice/loginSlice';
import '../../styles/components/home/Register.css'

const Register = () => {
  const { login, password, name, lastName, email } = useSelector(state => state.register)
  const dispatch = useDispatch()
  const [response, setResponse] = useState('')

  const regexGeneral = /^[a-zA-Z0-9_]{3,20}$/
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse('')
    if(regexGeneral.test(name) && regexGeneral.test(lastName) && regexGeneral.test(login) && regexPassword.test(password)){
    const formData = {
      name: name,
      lastname: lastName,
      email: email,
      login: login,
      password: password,
    };
    dispatch(registerSubmit(formData))
      .then(() => {
        dispatch(makeInitialRegisterForm())
        dispatch(closeRegisterState())
        dispatch(openloginState())
      });
    } else {
      setResponse('fill gaps correctyle')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setResponse('')
    }, 1500);
  }, [response])
  return (
      <form autoComplete='off' onSubmit={handleSubmit} className="auth-form-container">
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
          <input type="text" placeholder="name..." name="name" id="name" value={name} onChange={(e) => dispatch(formName(e.target.value))}/>
        <label htmlFor="lastName">Last Name</label>
          <input type="text" placeholder="lastname..." name="lastName" id="lastName" value={lastName} onChange={(e) => dispatch(formLastName(e.target.value))}/>
        <label htmlFor="email">Email</label>
          <input type="email" placeholder="email..." name="email" id="email" value={email} onChange={(e) => dispatch(formEmail(e.target.value))}/>
        <label htmlFor="login">Login</label>
          <input type="text" placeholder="login..." name="login" id="login" value={login} onChange={(e) => dispatch(formLogin(e.target.value))}/>
        <label htmlFor="password">Password</label>
          <input type="password" placeholder="password..." name="password" id="password" value={password} onChange={(e) => dispatch(formPassword(e.target.value))}/>
        <h3>{response}</h3>
        <button>Sign Up</button>
      </form>
  )
}

export default Register;
