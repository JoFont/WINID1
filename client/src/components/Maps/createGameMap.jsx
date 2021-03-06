import React, { useState, useEffect, useGlobal} from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { getAll as getAllGames } from "../../services/api/game";
import addGameMarker from "../../services/maps/addGameMarker";
import { MapboxAccessToken } from "../../constants/access-tokens";

const Map = props => {
  mapbox.accessToken = MapboxAccessToken;

  const [mapState, setMapState] = useState({
    lat: 38.736946,
    lng: -9.142685,
    zoom: props.zoom
  });

  let mapContainer;
  let map;

  // Isto em principio funciona
  const addLocationMarker = coords => {
    const marker = new mapbox.Marker({ draggable: true }).setLngLat(coords).addTo(map);

    function onDragEnd() {
      let lngLat = marker.getLngLat();
      console.log(lngLat);
    }
      
    marker.on('dragend', onDragEnd);
  }

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
    }
    
    map.on("load", async () => {
      const games = await getAllGames();
      addLocationMarker([mapState.lng, mapState.lat]);
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
