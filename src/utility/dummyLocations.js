import { locationsList } from '../constants/locations.constants'
import { createLocationObject } from './helper'

const directions = [
  {
    from: locationsList.Javeriana,
    to: locationsList.Andino,
    strokeColor: '#f68f54'
  }
]
const DummyLocations = directions.map(elem => {
  return createLocationObject(
    elem.from.latLng,
    elem.from.title,
    elem.to.latLng,
    elem.to.title,
    elem.strokeColor
  )
})

export default DummyLocations
