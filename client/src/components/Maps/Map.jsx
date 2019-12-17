import React, { useState, useEffect, useGlobal} from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { getAll as getAllGames } from "../../services/api/game";
import addGameMarker from "../../services/maps/addGameMarker";

const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

const Map = props => {
  mapbox.accessToken = process.env.REACT_APP_MapboxAccessToken;

  const [mapState, setMapState] = useState({
    lat: 38.736946,
    lng: -9.142685,
    zoom: props.zoom
  });

  let mapContainer;
  let map;


  // Isto faz refrescar duas vezes por causa do useGlobal como dependencia
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
      map.addControl(new MapboxGeocoder({
        accessToken: mapbox.accessToken,
        mapboxgl: mapbox,
        countries: "pt",
        types: "region, district, place, locality, neighborhood, address, poi"
      }));
    }
    
    map.on("load", async () => {
      const games = await getAllGames();
      if(games.data.length > 0) {
        addGameMarker(games.data, map);
      }
    });

    //? Effect cleanup => é igual a componentWilUnmount
    return () => {
      map.remove();
    }
  }, [mapContainer]);


  return <div ref={el => (mapContainer = el)} className="mapContainer w-100 h-screen m-0"></div>;
};

export default Map;
