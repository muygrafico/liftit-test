import { mapConstants } from '../constants/map.constants'

export function updateOrigin (payload) {
  return {
    type: mapConstants.MAP_ORIGIN_UPDATED,
    payload
  }
}

export function updateDestination (payload) {
  return {
    type: mapConstants.MAP_DESTINATION_UPDATED,
    payload
  }
}

export function updateCenter (payload) {
  return {
    type: mapConstants.MAP_CENTER_UPDATED,
    payload
  }
}

export function error (error) {
  return { type: mapConstants.ERROR, error }
}
