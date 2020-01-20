import React, { useState, useEffect } from "reactn";
import Map from "../components/Maps/Map";
import { getAll as getAllSports } from "../services/api/sport";
import { getAll as getAllRequests } from "../services/api/request";
import { Select } from "antd";
import { searchBySport } from "../services/api/request";
const { Option } = Select;

const IndexView = props => {
  const [sports, setSports] = useState([]);
  const [requests, setRequests] = useState([]);

  const buildSports = async () => {
    const response = await getAllSports();
    setSports(response.data);
  };

  const buildMarkers = async () => {
    const response = await getAllRequests();
    setRequests(response.data);
  };

  useEffect(() => {
    buildMarkers();
    buildSports();
  }, []);

  const handleSportChange = async val => {
    const response = await searchBySport(val);
    setRequests(response.data);
  };

  return (
    <div className="relative">
      <Select defaultValue="All Sports" size="large" onChange={val => handleSportChange(val)} className="absolute z-10 w-1/4" style={{ top: 1 + "em", left: 1 + "em" }}>
        {sports &&
          sports.map(sport => {
            return (
              <Option key={sport._id} value={sport.name}>
                {sport.name}
              </Option>
            );
          })}
      </Select>
      <Map zoom={8} type="locateUser" lat={38.736946} lng={-9.142685} controls isInteractive showMarkers markersArray={requests}></Map>
    </div>
  );
};

export default IndexView;
