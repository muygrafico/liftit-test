import { authConstants } from '../constants'

export const alertActions = {
  success,
  error,
  start
}

function success (message) {
  return { type: authConstants.SUCCESS, message }
}

function error (message) {
  return { type: authConstants.ERROR, message }
}

function start (message) {
  return { type: authConstants.START, message }
}
