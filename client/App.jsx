import React, { useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthContext } from './contexts/authContext'
import { authReducer, initialState } from './contexts/authReducer'
import Home from './pages/index'
import PageNotFound from './pages/404/index'
import './App.css'

const App = () => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    </AuthContext.Provider>
  )
}

export default App
