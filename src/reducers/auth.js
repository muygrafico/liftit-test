import { authConstants } from '../constants'

const initialAuthState = {
  error: {
    message: ''
  },
  isLoggedIn: false
}

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case authConstants.START:
      return [
        ...state,
        {
          authenticaded: action.id
        }
      ]
    case authConstants.SUCCESS:
      return [
        ...state,
        {
          authenticaded: action.id
        }
      ]
    case authConstants.ERROR:
      return [
        ...state,
        {
          authenticaded: action.id
        }
      ]
    default:
      return state
  }
}

export default auth
