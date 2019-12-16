
export const flyToLocation = map => {
  let control;
  map._controls.forEach(ctrl => {
    console.dir(ctrl._container);
    if(ctrl._container.className.includes("mapboxgl-ctrl-group")) { 
      console.log(ctrl._container.innerHTML);
      control = ctrl._container.firstElementChild;
      // return;
    }
  });

  control.click();
}