import React, { useState, useEffect, useGlobal } from "reactn";
import mapbox from "mapbox-gl/dist/mapbox-gl.js";
import { getAll as getAllRequests } from "../../services/api/request";
import { MapboxAccessToken } from "../../constants/access-tokens";
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";


const Map = props => {
  mapbox.accessToken = MapboxAccessToken;
  const [playerCoordinates] = useGlobal("playerCoordinates");

  const [mapState] = useState({
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
    directions: props.showDirections
  });

  const [markers, setMarkers] = useState([]);

  let mapContainer;
  let map;
  let geoTracker;
  let rotateAnimFrame;
  

  
  // Isto faz refrescar duas vezes por causa do useGlobal como dependencia
  useEffect(() => {
    map = new mapbox.Map({
      container: mapContainer,
      style: "mapbox://styles/jofont/ck48k2a7l0hci1co0xskrj9xl",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
      interactive: props.isInteractive,
      pitch: 60,
    });

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

        if(props.rotate) {
          map.on("zoomend", () => {
            rotateCamera(0);
          });

          map.on("drag", () => {
            window.cancelAnimationFrame(rotateAnimFrame);
          });
        }
      });
    }

    if (props.controls) {
      map.addControl(new mapbox.NavigationControl());
    }

    map.on("load", async () => {
      if (props.showMarkers && props.markerArray.length > 0) {
        addRequestMarkers(props.markerArray, map);
        // const response = await getAllRequests();
        // if (response.data.length) {
        //   addRequestMarkers(response.data, map);
        // }
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

  

      if (props.buildings3D) {
        map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
  
            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        });
      }

    });

    //? Effect cleanup => é igual a componentWilUnmount
    return () => {
      map.remove();
    };
  }, [mapContainer, props]);

  const addRequestMarkers = (arr, map) => {
    const markerArr = [];

    markers.forEach(el => el.remove());
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
      markerArr.push(marker);
    });
    setMarkers(markers);
  };

  const rotateCamera = (timestamp) => {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 100) % 360, { duration: 0 });
    // Request the next frame of the animation.
    rotateAnimFrame = requestAnimationFrame(rotateCamera);
  }

  return <div ref={el => (mapContainer = el)} className={`mapContainer w-100 h-screen m-0 ${props.classes}`}></div>;
};

export default Map;
