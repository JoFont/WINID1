import React, { useState, useEffect, useGlobal} from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { getAll as getAllGames } from "../../services/api/game";
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

const Map = props => {
  mapbox.accessToken = process.env.REACT_APP_MapboxAccessToken;

  const [userToken] = useGlobal("userToken");
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
      map.addControl(new MapboxGeocoder({
        accessToken: mapbox.accessToken,
        mapboxgl: mapbox,
        countries: "pt",
        types: "region, district, place, locality, neighborhood, address, poi"
      }));
    }
    
    if(userToken) {
      map.on("load", function () {
        map.loadImage("https://i.imgur.com/MK4NUzI.png", async function(error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          const games = await getAllGames(userToken);
          if(games.data.length > 0) {
            games.data.forEach(game => {
              const popup = new mapbox.Popup({ offset: 25 }).setText(game.location.name || "Adiciona Mais locations, boi");
              new mapbox.Marker().setLngLat(game.location.location.coordinates).setPopup(popup).addTo(map);
            });
          }
          
        });
      });
    }

    //? Effect cleanup => é igual a componentWilUnmount
    return () => {
      map.remove();
    }
  }, [mapContainer, userToken]);


  return <div ref={el => (mapContainer = el)} className="mapContainer w-100 h-screen m-0"></div>;
};

export default Map;
