import React from 'react'
import Login from '../../components/home/Login'
import { useSelector } from "react-redux";
import Register from '../../components/home/Register'
import '../../styles/pages/Home.css'


const Home = () => {
  const { loginState } = useSelector(state => state.login)
  const { registerState } = useSelector(state => state.register)

  return(
    <div className="Home">
      {registerState && <Register />}
      {loginState && <Login />}
    </div>
  );
};

export default Home;
