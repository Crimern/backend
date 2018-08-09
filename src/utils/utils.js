export const radiusRelatedZoom = zoom => {
  if(zoom > 10) {
    return 18-zoom*5;
  } 
  if(zoom < 10) {
    return (18-zoom)*15;
  }
}
