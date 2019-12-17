import React, { useEffect, useState, useGlobal } from "reactn";
import CreateRequestForm from "../components/CreateRequest";
import { getById as getGameById } from "../services/api/game";
import Score from "../components/Games/Score";
import { Fragment } from "react";

const GameView = props => {
  const [userToken] = useGlobal("userToken");
  const [game, setGame] = useState();

  const buildGame = async () => {
    const fetchedGame = await getGameById(userToken, props.match.params.id);
    console.log("fetchedGame ==== >", fetchedGame.data);
    setGame(fetchedGame.data);
  };

  useEffect(() => {
    buildGame();
  }, [userToken]);


  return (
    <div>
      <div className="w-1/4 bg-gray-white px-4 mb-4">
        <div className="bg-white rounded shadow p-4">
          {/* <Score {...props} game={game}></Score> */}
          {game && game.score && (
            <Fragment>
              <div className="text-3xl text-black">{game.score[0]}</div>:<div className="text-3xl">{game.score[1]}</div>
            </Fragment>
          )}
        </div>
      </div>
      <div className="w-1/4 bg-gray-white px-4 mb-4">
        <div className="bg-white rounded shadow p-4">
          <CreateRequestForm></CreateRequestForm>
        </div>
      </div>
    </div>
  );
};

export default GameView;
