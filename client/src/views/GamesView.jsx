import React, { useState, useGlobal, useEffect } from "reactn";
import { Row, Col } from "antd";
import CreateGame from "../components/CreateGame";
import CreateModal from "../components/CreateModal";
import { getAll as getAllGames } from "../services/api/game";

const GamesView = () => {
  const [userToken] = useGlobal("userToken");
  const [gameList, setGameList] = useState([]);

  const buildList = async () => {
    const games = await getAllGames(userToken);
    console.log(games.data);
    setGameList(games.data);
  };

  useEffect(() => {
    buildList();
  }, [userToken]);

  return (
    <div className="px-6">
      <div className="flex mb-4 flex-wrap -mx-4">
        <div className="w-full bg-gray-200 p-4">
          <div className="w-full bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-winid1">EVERY.GAME.</h1>
            <CreateModal></CreateModal>
          </div>
        </div>

        <div className="w-1/4 bg-gray-white px-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            <CreateGame listUpdate={() => buildList()}></CreateGame>
          </div>
        </div>
        {gameList.map(game => {
          return (
            <div className="w-1/4 px-4 mb-6">
              <div className="bg-white shadow rounded p-6">
                <p>Starters: {game.starters.number}</p>
                <p>Subs: {game.subs.number}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamesView;
