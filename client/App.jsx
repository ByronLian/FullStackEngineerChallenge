import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/index'
import PageNotFound from './pages/404/index'
import './App.css'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={PageNotFound} />
    </Switch>
  )
}

export default App
