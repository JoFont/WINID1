import React from "react";
import Map from "../components/Maps/Map";
import LocationInput from "../components/Maps/LocationInput";

const HomeView = () => {
  return (
    <div>
      <LocationInput></LocationInput>
      <Map zoom={8} type="locateUser" controls></Map>
    </div>
  );
};

export default HomeView;
