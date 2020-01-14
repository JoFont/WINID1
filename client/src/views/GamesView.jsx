import React, { useState, useGlobal, useEffect } from "reactn";
import { Link } from "react-router-dom";
import { Skeleton, Icon } from "antd";
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
            {/* <CreateModal></CreateModal> */}
          </div>
        </div>

        <div className="w-1/4 bg-gray-white px-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            <CreateGame listUpdate={() => buildList()}></CreateGame>
          </div>
        </div>
        <div className="w-3/4 flex flex-wrap">
          {gameList.map(game => {
            return (
              <div key={game._id} className="w-1/3 px-4 mb-6">
                <div className="bg-white shadow rounded relative">
                  <Link to={"/game/" + game._id}>
                    <Icon
                      type="eye"
                      theme="twoTone"
                      twoToneColor="#5a67d8"
                      className=" hover:bg-indigo-300 cursor-pointer p-1 hover:text-white rounded absolute right-0 top-0 mt-2 mr-2 text-xl border border-2 border-gray-300 hover:border-winid-1"
                    />
                  </Link>

                  <div className={`bg-white w-full rounded-lg`}>
                    {(!game && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
                      <div className="flex items-center justify-center bg-gray-100 py-4 rounded pb-6">
                        <div className="leading-none font-semibold rounded-full bg-transparent text-white relative">
                          <img
                            src={`/icons/sport-icons/${game && game.sport && game.sport.icon}.svg`}
                            className="w-24"
                          />
                          <div
                            className="leading-none font-semibold -mt-6 -ml-6 rounded-full bg-white p-2 shadow text-white bg-winid-1 absolute"
                            style={{ right: -0.25 + "em", bottom: -0.25 + "em" }}
                          >
                            <span className="text-2xl">{game.price.value / 100}</span>
                            <small className="text-gray-300 text-xs">€</small>
                            {/* TODO: {request.game.price.currency} => CONVERT CURRENCY IN THE FUTURE*/}
                          </div>
                        </div>
                      </div>
                    )}
                    {(!game && <Skeleton active paragraph={false} className="p-4 mt-0" />) || (
                      <div className="rounded-lg -mt-3 p-4 border-t bg-white">
                        <div className="flex justify-between items-stretch text-center shadow rounded-lg">
                          <div className="w-1/3 flex flex-col">
                            <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">
                              starters
                            </span>
                            <div className="text-2xl w-full leading-none py-1">
                              <span className="leading-none">{game.starters ? game.starters.length : 0}</span>
                              <small className="text-gray-400 text-xs">/{game.startersNum * 2}</small>
                            </div>
                          </div>
                          <div className="w-1/3 flex flex-col border-l border-r">
                            <span className="uppercase text-xs text-gray-500 bg-gray-200 border-b">subs</span>
                            <div className="text-2xl w-full leading-none py-1">
                              <span className="leading-none">{game.subs ? game.subs.length : 0}</span>
                              <small className="text-gray-400 text-xs">/{game.subsNum * 2}</small>
                            </div>
                          </div>
                          <div className="w-1/3 flex flex-col">
                            <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tr border-b">
                              invited
                            </span>
                            <div className="text-2xl w-full leading-none py-1">
                              <span className="leading-none">{game.players ? game.players.length : 0}</span>
                              {/* <small className="text-gray-400 text-xs">/{game.subs.number}</small> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamesView;
