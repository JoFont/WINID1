import React from "react";
import Map from "../components/Maps/Map";

const IndexView = () => {
  return (
    <div>
      <Map zoom={8} type="locateUser" lat={38.736946} lng={-9.142685} controls isInteractive showMarkers></Map>
    </div>
  );
};

export default IndexView;
