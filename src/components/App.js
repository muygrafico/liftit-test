
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import LoggedIn from './LoggedIn'
import NoMatch from './NoMatch'

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/logged' component={LoggedIn}/>
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default App