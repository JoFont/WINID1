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

    fire
      .firestore()
      .collection("chatGroups")
      .doc(fetchedGame.data.chatRef)
      .collection("messages")
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const msg = doc.data();
          setMessages([...messages, msg]);
        });
      });
  };

  const addMessage = async e => {
    if (e.key === "Enter") {
      console.log(e.target.value);

      await sendChatMessage(fire, game.chatRef, {
        photoUrl: player.photoUrl,
        text: e.target.value,
        displayName: player.displayName,
        username: player.username
      });

      // e.target.innerText = "";
    }
  };

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
          {messages.map(message => {
            return <p>{message.text}</p>;
          })}
          {/* TO BE MESSAGE COMPONENT */}
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-1">
              <div className="-mb-6 flex items-center">
                <img
                  src="https://api.adorable.io/avatars/256/abc@abc.com.png"
                  alt=""
                  className="rounded-full w-10 ml-2 shadow z-10"
                />
                <span className="text-gray-700 font-bold uppercase text-s leading-none bg-white rounded pl-3 pr-2 py-1 shadow -ml-2 z-0">
                  Filipe Catarino
                </span>
              </div>
              <span className="text-gray-400 leading-none text-xs">21:45</span>
            </div>
            <div className="bg-white p-4 shadow rounded-l-lg rounded-tr-lg">
              <div className="w-full leading-tight text-base mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eaque delectus, ullam est perferendis
                eius sint dolorum officia libero laboriosam porro dicta, aliquid earum vitae, explicabo dolores id
                placeat molestiae!
              </div>
            </div>
          </div>
          {/* TO BE MESSAGE COMPONENT */}
        </div>
        <div className="w-full absolute bottom-0 left-0 p-3 border-t-2">
          <Input className="shadow" size="large" suffix={<Icon type="right" />} onKeyPress={addMessage}></Input>
        </div>
      </div>
    </div>
  );
};

export default GameView;
