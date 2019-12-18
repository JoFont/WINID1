import React, { useEffect, useState, useGlobal, Fragment } from "reactn";
import { Input, Icon, Empty } from "antd";
import { Link } from "react-router-dom";
import CreateRequestForm from "../components/CreateRequest";
import { getById as getGameById, addPlayerToPlayers } from "../services/api/game";
import Score from "../components/Games/Score";
import { sendChatMessage } from "../services/chat";
import Bubble from "../components/Chats/Bubble";
import SearchUser from "../components/SearchUser";

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
        if (allMessages.length > 0) {
          const element = document.getElementById("chat");
          element.scrollTop = element.scrollHeight - element.clientHeight;
        }
      });
  };

  const addMessage = async e => {
    if (e.key === "Enter" && e.target.value !== "") {
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

  const addPlayerToPlayersHandler = async playerToAdd => {
    playerToAdd = JSON.parse(playerToAdd);
    const response = await addPlayerToPlayers(fire, userToken, game, playerToAdd);
    setGame(response.data);
  };

  useEffect(() => {
    if (userToken) {
      buildGame();
    }
  }, [userToken]);

  return (
    <div className="flex flex-wrap items-stretch min-h-screen">
      <div className="w-1/3 border-r min-h-screen bg-white">
        {/* {game && <img src={game.location.locationPhotoUrl} alt="" className="w-full" />} */}
        <div className="w-full p-4 mb-4">
          <div className="bg-white rounded shadow">
            {game && (
              <div className="flex justify-between items-stretch text-center">
                <div className="w-1/3 flex flex-col">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">starters</span>
                  <div className="text-2xl w-full leading-none py-1">
                    <span className="leading-none">{game.starters.players ? game.starters.players.length : 0}</span>
                    <small className="text-gray-400 text-xs">/{game.starters.number * 2}</small>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col border-l border-r">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 border-b">subs</span>
                  <div className="text-2xl w-full leading-none py-1">
                    <span className="leading-none">{game.subs.players ? game.subs.players.length : 0}</span>
                    <small className="text-gray-400 text-xs">/{game.subs.number * 2}</small>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tr border-b">invited</span>
                  <div className="text-2xl w-full leading-none py-1">
                    <span className="leading-none">{game.players ? game.players.length : 0}</span>
                    {/* <small className="text-gray-400 text-xs">/{game.subs.number}</small> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <SearchUser
          handlePlayerSelect={addPlayerToPlayersHandler}
          compareArray={game ? game.players.map(player => player._id) : []}
        ></SearchUser>

        <div className="w-full p-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            {game &&
              game.players.map(player => {
                return (
                  <div key={player._id}>
                    <Link to={"/player/" + player.username}>{player.displayName}</Link>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full bg-gray-white p-4 mb-4">
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
            <CreateRequestForm game={game}></CreateRequestForm>
          </div>
        </div>
      </div>
      <div className="w-2/3 relative h-screen max-h-screen flex flex-col justify-stretch items-stretch">
        {(!messages.length && (
          <div className="w-full h-full py-4 px-8 overflow-y-scroll z-0 flex items-center justify-center">
            <Empty></Empty>
          </div>
        )) || (
          <div className="w-full h-full py-4 px-8 overflow-y-scroll z-0" id="chat">
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
