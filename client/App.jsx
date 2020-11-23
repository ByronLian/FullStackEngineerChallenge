import React, { useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthContext } from './contexts/authContext'
import { authReducer, initialState } from './contexts/authReducer'
import Home from './pages/index'
import Reviews from './pages/review/index'
import Employee from './pages/admin/employee/index'
import Assign from './pages/admin/assign/index'
import Period from './pages/admin/period/index'
import PageNotFound from './pages/404/index'
import './App.css'

const App = () => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/employees" component={Employee} />
        <Route exact path="/assign" component={Assign} />
        <Route exact path="/periods" component={Period} />
        <Route component={PageNotFound} />
      </Switch>
    </AuthContext.Provider>
  )
}

export default App
