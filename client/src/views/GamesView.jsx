import React from "react";
import { Row, Col } from "antd";
import CreateGame from "../components/CreateGame";

const GamesView = () => {
  return (
    <div className="px-6">
      <div className="flex mb-4 flex-wrap -mx-4">
        <div className="w-full bg-gray-200 p-4">
          <div className="w-full bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-winid1">EVERY.GAME.</h1>
          </div>
        </div>

        <div className="w-full bg-gray-white px-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            <CreateGame></CreateGame>
          </div>
        </div>
        <div className="w-1/4 bg-gray-400 px-4">
          <div className="bg-white shadow rounded h-50">1/4</div>
        </div>
        <div className="w-1/4 bg-gray-500 px-4">
          <div className="bg-white">1/4</div>
        </div>
        <div className="w-1/4 bg-gray-400 px-4">
          <div className="bg-white">1/4</div>
        </div>
      </div>
    </div>
  );
};

export default GamesView;
