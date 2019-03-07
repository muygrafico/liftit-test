const convertTolatLng = (latLng, title) => {
  return {
    latLng,
    title
  }
}

export const locationsList = {
  Mumbai: convertTolatLng('4.638777, -74.060706', 'Mumbai'),
  Pune: convertTolatLng('4.666061, -74.055765', 'Pune')
}
