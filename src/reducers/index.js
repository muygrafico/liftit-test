import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import map from './map'

export default combineReducers({
  auth,
  map,
  form
})
