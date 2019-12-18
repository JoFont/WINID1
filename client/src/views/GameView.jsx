import React, { useEffect, useState, useGlobal, Fragment } from "reactn";
import { Input, Icon } from "antd";
import CreateRequestForm from "../components/CreateRequest";
import { getById as getGameById } from "../services/api/game";
import Score from "../components/Games/Score";
import { sendChatMessage } from "../services/chat";

const GameView = props => {
  const [userToken] = useGlobal("userToken");
  const [game, setGame] = useState();
  const [fire] = useGlobal("fire");
  const [player] = useGlobal("player");
  const [messages, setMessages] = useState([]); 

  const buildGame = async () => {
    const fetchedGame = await getGameById(userToken, props.match.params.id);
    console.log("fetchedGame ==== >", fetchedGame.data);
    setGame(fetchedGame.data);

    fire.firestore().collection("chatGroups").doc(fetchedGame.data.chatRef).collection("messages")
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const msg = doc.data();
          setMessages([...messages, msg]);
        });
    });
  };

  const addMessage = async e => {
    if(e.key === "Enter") {
      console.log(e.target.value);

      await sendChatMessage(fire, game.chatRef, {
        photoUrl: player.photoUrl,
        text: e.target.value,
        displayName: player.displayName,
        username: player.username
      });

      // e.target.innerText = "";
    }
  }

  useEffect(() => {
    buildGame();

  }, [userToken]);



  return (
    <div className="flex flex-wrap items-stretch min-h-screen">
      <div className="w-1/3 border-r min-h-screen bg-white">
        <div className="w-full bg-gray-white px-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            {/* <Score {...props} game={game}></Score> */}
            {game && game.score && (
              <Fragment>
                <div className="text-xl text-black flex justify-center items-center">
                  <span className="text-4xl">{game.score[0]}</span>
                  <span className="mx-2">:</span>
                  <span className="text-4xl">{game.score[1]}</span>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-white px-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            <CreateRequestForm></CreateRequestForm>
          </div>
        </div>
      </div>
      <div className="w-2/3 relative">
        <div className="w-full h-full p-4">
          <div className="bg-white w-1/3 p-4 shadow rounded-l-lg rounded-tr-lg">
            <span className="font-bold uppercase w-full text-blue-400 text-xs">Filipe Catarino</span>
            <div className="w-full text-xs">
              <span className="text-gray-400 uppercase">@Alntjan</span>
              <span className="text-muted">21:45</span>
            </div>
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 p-3 border-t-2">
          <Input className="shadow" size="large" suffix={<Icon type="right" />} onKeyPress={addMessage}></Input>
        </div>
      </div>
    </div>
  );
};

export default GameView;
