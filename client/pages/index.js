import React, { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { isLogin } from '../utils'
import Login from './login'

const Home = () => {
  const { user, dispatch } = useContext(AuthContext)

  return <>{!isLogin(user) ? <Login dispatch={dispatch} /> : <>{`Hi ${user.email}`}</>}</>
}

export default Home
