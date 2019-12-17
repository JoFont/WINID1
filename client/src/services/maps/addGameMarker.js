import mapbox from "mapbox-gl/dist/mapbox-gl.js";

const addGameMarker = (arr, map) => {
  arr.forEach(game => {
    console.log(game);
    const popup = new mapbox.Popup({ offset: 25 }).setText(game.players[0].username || "Adiciona Mais locations, boi");
    new mapbox.Marker().setLngLat(game.location.location.coordinates).setPopup(popup).addTo(map);
  });
}

export default addGameMarker;