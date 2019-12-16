
export const flyToLocation = mapContanier => {
  console.log(mapContanier);
  console.dir(mapContanier);
  const test = mapContanier.querySelector(".mapboxgl-control-container .mapboxgl-ctrl-top-right .mapboxgl-ctrl-group button");
  const test2 = document.querySelector(".mapboxgl-control-container .mapboxgl-ctrl-top-right .mapboxgl-ctrl-group .mapboxgl-ctrl-geolocate");
  console.log(test2)
  // let control;
  // map._controls.forEach(ctrl => {
  //   console.dir(ctrl._container);
  //   if(ctrl._container.className.includes("mapboxgl-ctrl-group")) { 
  //     console.log(ctrl._container.innerHTML);
  //     control = ctrl._container.firstElementChild;
  //     // return;
  //   }
  // });

  // control.click();
}