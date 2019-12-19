import React from "react";
import Map from "../components/Maps/Map";
import { Select } from "antd";
const { Option } = Select;

const IndexView = props => {
  const handleSportChange = () => {};

  return (
    <div className="relative">
      <Select
        defaultValue="All Sports"
        size="large"
        onChange={handleSportChange}
        className="absolute z-10 w-1/4"
        style={{ top: 1 + "em", left: 1 + "em" }}
      >
        {allSports &&
          allSports.map(sport => {
            <Option key={sport._id} value={sport.name}>
              {sport.name}
            </Option>;
          })}
      </Select>
      <Map zoom={8} type="locateUser" lat={38.736946} lng={-9.142685} controls isInteractive showMarkers rotate></Map>
    </div>
  );
};

export default IndexView;
