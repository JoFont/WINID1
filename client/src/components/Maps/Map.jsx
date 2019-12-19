import React, { useState, useEffect, useGlobal } from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { getAll as getAllRequests } from "../../services/api/request";
import { Link } from "react-router-dom";
import { MapboxAccessToken } from "../../constants/access-tokens";
const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");

const addRequestMarker = (arr, map) => {
  arr.forEach(request => {
    const html = `
      <div>
        <a class="requestPopup btn bg-blue-500 p-3 text-white" href="/request/${request._id}" data-request="${request._id}">GAMES!</a>
      </div>
    `;
    // DEUS => onclick="(function(){alert('ALBERTO');return false;})();return false;"

    const popup = new mapbox.Popup({ offset: 25 }).setHTML(html);
    const marker = new mapbox.Marker()
      .setLngLat(request.game.location.location.coordinates)
      .setPopup(popup)
      .addTo(map);
  });
};

const Map = props => {
  mapbox.accessToken = MapboxAccessToken;

  const [mapState] = useState({
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

    if (props.type === "locateUser") {
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

    if (props.controls) {
      map.addControl(new mapbox.NavigationControl());
    }

    map.on("load", async () => {
      const response = await getAllRequests();
      if (response.data.length) {
        console.log(response.data);
        addRequestMarker(response.data, map);
      }
    });

    //? Effect cleanup => é igual a componentWilUnmount
    return () => {
      map.remove();
    };
  }, [mapContainer]);

  return <div ref={el => (mapContainer = el)} className="mapContainer w-100 h-screen m-0"></div>;
};

export default Map;
