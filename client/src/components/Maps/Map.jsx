import React, { useState, useEffect } from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";

const Map = props => {
  mapbox.accessToken = process.env.REACT_APP_MapboxAccessToken;

  const [mapState, setMapState] = useState({
    lat: 38.736946,
    lng: -9.142685,
    zoom: props.zoom
  });

  let mapContainer;
  let map;

  

  useEffect(() => {
    map = new mapbox.Map({
      container: mapContainer,
      style: "mapbox://styles/jofont/ck48k2a7l0hci1co0xskrj9xl",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    });

    if(props.type === "locateUser") {
      const geoTracker = new mapbox.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      map.addControl(geoTracker);

      map.on("load", () => {
        geoTracker._geolocateButton.click();
      });
    }

    if(props.controls) {
      map.addControl(new mapbox.NavigationControl());
    }

  }, [mapContainer]);

  return <div ref={el => (mapContainer = el)} className="mapContainer w-100 h-screen m-0"></div>;
};

export default Map;
