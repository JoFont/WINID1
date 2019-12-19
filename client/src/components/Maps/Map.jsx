import React, { useState, useEffect, useGlobal } from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { getAll as getAllRequests } from "../../services/api/request";
import { MapboxAccessToken } from "../../constants/access-tokens";
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

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
  const [playerCoordinates] = useGlobal("playerCoordinates");

  const [mapState] = useState({
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
    directions: props.showDirections
  });

  let mapContainer;
  let map;
  let geoTracker;

  // Isto faz refrescar duas vezes por causa do useGlobal como dependencia
  useEffect(() => {
    map = new mapbox.Map({
      container: mapContainer,
      style: "mapbox://styles/jofont/ck48k2a7l0hci1co0xskrj9xl",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
      interactive: props.isInteractive
    });
    console.log(props)

    if (props.type === "locateUser") {
      geoTracker = new mapbox.GeolocateControl({
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
      if (props.showMarkers) {
        const response = await getAllRequests();
        if (response.data.length) {
          addRequestMarker(response.data, map);
        }
      }
      if (map && props.showDirections) {
        const directionsPlugin = new Directions({
          accessToken: mapbox.accessToken,
          unit: "metric",
          controls: {
            instructions: false
          },
          interactive: false
        });

        map.addControl(directionsPlugin, "top-left");
        console.log(playerCoordinates);
        directionsPlugin.setOrigin(playerCoordinates)
        directionsPlugin.setDestination([props.lng, props.lat])
      }

    });

    //? Effect cleanup => é igual a componentWilUnmount
    return () => {
      map.remove();
    };
  }, [mapContainer, props]);



  return <div ref={el => (mapContainer = el)} className={`mapContainer w-100 h-screen m-0 ${props.classes}`}></div>;
};

export default Map;
