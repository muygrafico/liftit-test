import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import LoggedIn from './components/LoggedIn'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import rootReducer from './reducers'
import './scss/main.scss'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const routing = (
  <Router>
    <div className='app-container'>
      <Route exact path='/' component={App} />
      <Route path='/logged' component={LoggedIn} />
    </div>
  </Router>
)

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>
)

render(<Root store={store} />, document.getElementById('index'))
