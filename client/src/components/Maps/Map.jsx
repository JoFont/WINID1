import React, { useState, useEffect } from 'reactn';
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { flyToLocation } from "../../services/mapbox/flyToLocation";

const Map = props => {
  const [mapState, setMapState] = useState({
    lat: 38.736946,
    lng: -9.142685,
    zoom: props.zoom,
  });

  let mapContainer;

  useEffect(() => {
    mapbox.accessToken = process.env.REACT_APP_MapboxAccessToken;
    const map = new mapbox.Map({
      container: mapContainer,
      style: "mapbox://styles/jofont/ck48k2a7l0hci1co0xskrj9xl",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    });
    map.addControl(
      new mapbox.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    flyToLocation(map);
    console.log(map._controls);
  }, [mapContainer]);



  return (
    <div ref={el => (mapContainer = el)} className="container w-screen h-screen m-0"></div>
  )
}

export default Map;
