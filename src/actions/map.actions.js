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

export function updateDistance (payload) {
  return {
    type: mapConstants.MAP_DISTANCE_UPDATED,
    payload
  }
}

export function updateDuration (payload) {
  return {
    type: mapConstants.MAP_DURATION_UPDATED,
    payload
  }
}

export function error (error) {
  return { type: mapConstants.ERROR, error }
}
