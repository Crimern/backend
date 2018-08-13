export const radiusRelatedZoom = zoom => {
  return Number.parseFloat(156.412/(Math.pow(2,zoom))).toFixed(3)
}