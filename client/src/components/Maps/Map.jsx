import React, { useState, useEffect } from "react"
import mapbox from "mapbox-gl/dist/mapbox-gl.js"
import TOKEN from "../../constants/mapbox.token";

const TestMap = () => {
  const [mapState, setMapState] = useState({
    lat: 38.736946,
    lng: -9.142685,
    zoom: 12,
  })

  let mapContainer;

  useEffect(() => {
    mapbox.accessToken = TOKEN;

    const map = new mapbox.Map({
      container: mapContainer,
      style: "mapbox://styles/jofont/ck48k2a7l0hci1co0xskrj9xl",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom
    })
  }, [mapContainer])

  return <div ref={el => (mapContainer = el)} className="container w-screen h-screen m-0"></div>
}

export default TestMap
