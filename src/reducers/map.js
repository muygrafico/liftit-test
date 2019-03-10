import { mapConstants } from '../constants/map.constants'

const initialAuthState = {
  error: '',
  origin: '',
  destination: ''
}

const map = (state = initialAuthState, action) => {
  switch (action.type) {
    case mapConstants.MAP_ORIGIN_UPDATED:
      return Object.assign({}, state, { origin: action.payload })
    case mapConstants.MAP_DESTINATION_UPDATED:
      return Object.assign({}, state, { destination: action.payload })
    case mapConstants.MAP_ERROR:
      return Object.assign({}, state, { error: action.error })
    default:
      return state
  }
}

export default map
