import mapbox from "mapbox-gl/dist/mapbox-gl.js";

const addGameMarker = (arr, map) => {
  arr.data.forEach(game => {
    const popup = new mapbox.Popup({ offset: 25 }).setText(game.location.name || "Adiciona Mais locations, boi");
    new mapbox.Marker().setLngLat(game.location.location.coordinates).setPopup(popup).addTo(map);
  });
}

export default addGameMarker;