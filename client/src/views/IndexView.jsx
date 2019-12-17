import React from "react";
import Map from "../components/Maps/Map";

const IndexView = () => {
  return (
    <div>
      <Map zoom={8} type="locateUser" controls></Map>
    </div>
  );
};

export default IndexView;
