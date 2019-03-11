import { mapConstants } from '../constants/map.constants'

const initialAuthState = {
  center: '',
  destination: '',
  distance: '',
  error: '',
  origin: '',
  duration: ''
}

const map = (state = initialAuthState, action) => {
  switch (action.type) {
    case mapConstants.MAP_ORIGIN_UPDATED:
      return Object.assign({}, state, { origin: action.payload })
    case mapConstants.MAP_DESTINATION_UPDATED:
      return Object.assign({}, state, { destination: action.payload })
    case mapConstants.MAP_DISTANCE_UPDATED:
      return Object.assign({}, state, { distance: action.payload })
    case mapConstants.MAP_DURATION_UPDATED:
      return Object.assign({}, state, { duration: action.payload })
    case mapConstants.MAP_CENTER_UPDATED:
      return Object.assign({}, state, { center: action.payload })
    case mapConstants.MAP_ERROR:
      return Object.assign({}, state, { error: action.error })
    default:
      return state
  }
}

export default map
