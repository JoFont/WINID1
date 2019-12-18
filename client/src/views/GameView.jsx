import React, { useEffect, useState, useGlobal, Fragment } from "reactn";
import { Input, Icon, Empty } from "antd";
import CreateRequestForm from "../components/CreateRequest";
import { getById as getGameById } from "../services/api/game";
import Score from "../components/Games/Score";
import { sendChatMessage } from "../services/chat";
import Bubble from "../components/Chats/Bubble";

const GameView = props => {
  const [userToken] = useGlobal("userToken");
  const [game, setGame] = useState();
  const [fire] = useGlobal("fire");
  const [player] = useGlobal("player");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const buildGame = async () => {
    const fetchedGame = await getGameById(userToken, props.match.params.id);
    setGame(fetchedGame.data);

    fire
      .firestore()
      .collection("chatGroups")
      .doc(fetchedGame.data.chatRef)
      .collection("messages")
      .orderBy("date")
      .onSnapshot(querySnapshot => {
        const allMessages = [];
        querySnapshot.forEach(doc => {
          allMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(allMessages);
        var element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight - element.clientHeight;
      });
  };

  const addMessage = async e => {
    if (e.key === "Enter") {
      await sendChatMessage(fire, game.chatRef, {
        photoUrl: player.photoUrl,
        text: inputMessage,
        displayName: player.displayName,
        username: player.username,
        playerId: player._id
      });
      setInputMessage("");
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
      <div className="w-2/3 relative h-screen max-h-screen flex flex-col justify-stretch items-stretch">
        {(!messages.length && (
          <div className="w-full h-full py-4 px-8 overflow-y-scroll z-0 flex items-center justify-center">
            <Empty></Empty>
          </div>
        )) || (
          <div className="w-full h-auto py-4 px-8 overflow-y-scroll z-0" id="chat">
            {messages.map(message => {
              return <Bubble message={message} key={message.id}></Bubble>;
            })}
          </div>
        )}

        <div className="w-full h-30 p-3 border-t-2 z-10 bg-gray-100">
          <Input
            className="shadow"
            size="large"
            suffix={<Icon type="right" />}
            onKeyPress={addMessage}
            placeholder="send message..."
            onChange={e => setInputMessage(e.target.value)}
            value={inputMessage}
          ></Input>
        </div>
      </div>
    </div>
  );
};

export default GameView;
