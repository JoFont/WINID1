
export const flyToLocation = map => {
  let control;
  map._controls.forEach(ctrl => {
    console.log(ctrl);
    if(ctrl._container.childNodes[0].className.includes("mapboxgl-ctrl-geolocate")) { 
      console.log("HELOOOOOOO");
      control = ctrl;
      // return;
    }
  });

  control.click();
}