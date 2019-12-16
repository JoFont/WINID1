import React, { useState, useEffect } from "react"
import mapbox from "mapbox-gl/dist/mapbox-gl.js"
import TOKEN from "../../constants/mapbox.token"

const TestMap = () => {
  const [mapProps, setMapProps] = useState({
    lat: 38.736946,
    lng: -9.142685,
    zoom: 12
  })

  let mapContainer

  useEffect(() => {
    mapbox.accessToken = TOKEN
    // TODO: Oh Zé Manel, para trocar a skin do mapa é só ires ao studio dos gajos, criares um tema e colares onde diz style: ... o link que fica no dasdhboard dos temas (não dentro do studio em si, mas no dashboard do studio).
    const map = new mapbox.Map({
      container: mapContainer,
      style: "mapbox://styles/jofont/ck44ugyn00syl1co5br08n1ai",
      center: [mapProps.lng, mapProps.lat],
      zoom: mapProps.zoom
    })
  }, [mapContainer])

  return <div ref={el => (mapContainer = el)} className="container w-screen h-screen m-0"></div>
}

export default TestMap
