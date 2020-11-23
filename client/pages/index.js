import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'
import { isLogin } from '../utils'
import Login from './login/index'

const Home = () => {
  const { user, dispatch } = useContext(AuthContext)

  return <>{!isLogin(user) ? <Login dispatch={dispatch} /> : <Redirect to="/reviews" />}</>
}

export default Home
