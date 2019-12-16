import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import { Icon } from "antd";
import useLocation from "../../hooks/useLocation";

const Map = () => {
  const location = useLocation();
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 31.9742044,
    longitude: -49.25875,
    zoom: 2
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (location) {
      setViewport(vp => ({
        ...vp,
        ...location,
        zoom: 8
      }));


    }
  }, [location, setViewport]);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jofont/ck48k2a7l0hci1co0xskrj9xl"
      mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
      {...viewport}
      onViewportChange={vp => setViewport(vp)}
    >
    {location ? (
      <GeolocateControl 
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          onLoad={() => console.log("Loaded Cenas")}
        />
      ) : null}
    </ReactMapGL>
  );
};

export default Map;
