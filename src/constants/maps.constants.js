const KEY = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY

export const mapConstants = {
  KEY,
  G_API_URL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&&v=3.exp&libraries=geometry,drawing,places`
}
