const convertTolatLng = (latLng, title) => {
  return {
    latLng,
    title
  }
}

export const locationsList = {
  Javeriana: convertTolatLng('4.6282556, -74.0651001', 'Javeriana'),
  Andino: convertTolatLng('4.666061, -74.055765', 'Andino')
}
