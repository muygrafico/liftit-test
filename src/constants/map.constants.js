const KEY = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY || 'AIzaSyDvZ2jHunBWZalv0woF8jDnhoryDgRLBDA'

export const mapConstants = {
  KEY,
  G_API_URL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&&v=3.exp&libraries=geometry,drawing,places`,
  MAP_ORIGIN_UPDATED: 'MAP_ORIGIN_UPDATED',
  MAP_DESTINATION_UPDATED: 'MAP_DESTINATION_UPDATED',
  MAP_ERROR: 'MAP_ERROR'
}
