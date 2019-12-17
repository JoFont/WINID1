import mapbox from "mapbox-gl/dist/mapbox-gl.js";

const addGameMarker = (arr, map) => {
  arr.forEach(game => {
    const popup = new mapbox.Popup({ offset: 25 }).setHTML(`<h1 class="text-xl text-winid-3">${game.players[0].username}</h1>`);
    new mapbox.Marker().setLngLat(game.location.location.coordinates).setPopup(popup).addTo(map);
  });
}

export default addGameMarker;