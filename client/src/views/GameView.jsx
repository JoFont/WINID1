import React, { useEffect, useState, useGlobal, Fragment } from "reactn";
import { Input, Icon, Empty, Skeleton, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { formatRelative } from "date-fns";

import CreateRequestForm from "../components/CreateRequest";
import { getById as getGameById, addPlayerToPlayers, deleteOne } from "../services/api/game";
import Score from "../components/Games/Score";
import { sendChatMessage } from "../services/chat";
import Bubble from "../components/Chats/Bubble";
import SearchUser from "../components/SearchUser";
import Spinner from "../components/Spinner";
import Map from "../components/Maps/Map";

const GameView = props => {
  const [userToken] = useGlobal("userToken");
  const [game, setGame] = useState();
  const [fire] = useGlobal("fire");
  const [player] = useGlobal("player");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [directions, setDirections] = useState(false);

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

          const lastBubble = document.querySelector(".bubble:last-of-type");
          lastBubble.classList.add("animated", "fadeInUp", "faster");
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

  const handleDeleteGame = async () => {
    const response = await deleteOne(fire, userToken, game, player);
    if (response.data.deleted) props.history.push("/games");
  };

  useEffect(() => {
    if (userToken) {
      buildGame();
    }
  }, [userToken]);

  return (
    <Fragment>
      {(player === undefined && <Spinner />) ||
        (player !== null && (
          <div className="flex flex-wrap items-stretch min-h-screen">
            {/* Inicio do ASIDE */}
            <div className="w-1/3 border-r min-h-screen bg-white">
              <div
                className="h-32 bg-gray-300 relative"
                style={{
                  background: `url(${(game && game.location.locationPhotoUrl) || ""})`
                }}
              >
                <button
                  className="w-auto mr-1 mb-1 absolute text-xs right-0 bottom-0 bg-winid-1 hover:bg-blue-600 text-white font-thin py-1 px-2 border-b-2 border-winid-4 hover:border-blue-700 rounded"
                  onClick={() => {
                    setAnimation("fadeOut");
                    setDirections(true);
                  }}
                >
                  directions
                </button>
              </div>
              <div className={`bg-white w-full p-6 animated ${animation}`}>
                {(!game && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
                  <div className="flex items-center justify-center mb-6">
                    <div className="leading-none font-semibold -mt-20 rounded-full bg-transparent text-white relative">
                      <img src={`/icons/sport-icons/${game && game.sport && game.sport.icon}.svg`} className="w-24" />
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
                {(!game && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
                  <div className="flex justify-between items-stretch text-center shadow rounded-lg">
                    <div className="w-1/3 flex flex-col">
                      <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">starters</span>
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
                      <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tr border-b">invited</span>
                      <div className="text-2xl w-full leading-none py-1">
                        <span className="leading-none">{game.players ? game.players.length : 0}</span>
                        {/* <small className="text-gray-400 text-xs">/{game.subs.number}</small> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {game && game.starters.length > 0 && (
                <div className="w-full mb-2 px-6">
                  <div className="uppercase text-gray-400 font-semibold text-xs flex items-center mb-1">
                    <span>Starters</span>
                    <Icon type="down" className="ml-1" />
                  </div>

                  <div className="bg-white rounded shadow">
                    {game &&
                      game.starters &&
                      game.starters.map((starter, index) => {
                        return (
                          <div
                            key={starter._id}
                            className={`flex items-center justify-start pl-2 pr-4 py-2 rounded ${
                              index % 2 !== 0 ? "bg-gray-100" : "bg-white"
                            }`}
                          >
                            <img src={starter.photoUrl} className="rounded-full w-6 mr-3" alt="" />
                            <Link to={"/player/" + starter.username}>{starter.displayName}</Link>
                            <Icon
                              type="skin"
                              className="text-green-500 text-lg ml-auto"
                              twoToneColor="#9ae6b4"
                              theme="twoTone"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {game && game.subs.length > 0 && (
                <div className="w-full p-6 mb-4">
                  <div className="uppercase text-gray-400 font-semibold text-xs flex items-center mb-1">
                    <span>Subs</span>
                    <Icon type="down" className="ml-1" />
                  </div>
                  <div className="bg-white rounded shadow">
                    {game &&
                      game.subs &&
                      game.subs.map((sub, index) => {
                        return (
                          <div
                            key={sub._id}
                            className={`flex items-center justify-start pl-2 pr-4 py-2 rounded even:bg-gray-100`}
                          >
                            <img src={sub.photoUrl} className="rounded-full w-6 mr-3" alt="" />
                            <Link to={"/player/" + sub.username}>{sub.displayName}</Link>
                            <Icon
                              type="skin"
                              twoToneColor="#cbd5e0"
                              theme="twoTone"
                              className="text-gray-400 cursor-pointer hover:text-green-500 text-lg ml-auto"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              <div className="px-6 py-2">
                <div className="uppercase text-gray-400 font-semibold text-xs flex items-center mb-1">
                  <span>Players</span>
                  <Icon type="down" className="ml-1" />
                </div>
                <div className="flex justify-between items-stretch">
                  <SearchUser
                    handlePlayerSelect={addPlayerToPlayersHandler}
                    compareArray={game ? game.players.map(player => player._id) : []}
                    className="rounded-lg shadow border-none"
                  ></SearchUser>
                  <div className="leading-none text-xs text-gray-400 mx-2 flex items-center">
                    <span>or</span>
                  </div>
                  <Tooltip placement="top" title="Ask for players!">
                    <button className="bg-winid-1 px-4 rounded shadow">
                      <img src="/icons/logo.svg" className="h-6" />
                    </button>
                  </Tooltip>
                </div>
                <div className="bg-white rounded shadow mt-3">
                  {game &&
                    game.players &&
                    game.players.map((gamePlayer, index) => {
                      return (
                        <div
                          key={gamePlayer._id}
                          className={`flex items-center justify-start pl-2 pr-4 py-2 rounded ${
                            index % 2 !== 0 ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <img src={gamePlayer.photoUrl} className="rounded-full w-6 mr-3" alt="" />
                          <Link to={"/player/" + gamePlayer.username}>{gamePlayer.displayName}</Link>
                          <Icon
                            type="question-circle"
                            theme="twoTone"
                            twoToneColor="#fbd38d"
                            className="text-lg ml-auto"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="w-2/3 relative h-screen max-h-screen flex flex-col justify-stretch items-stretch">
              {(game &&
                game.players.reduce((validator, chatPlayer) => {
                  return chatPlayer.player === player._id ? !validator : validator;
                }, false) &&
                !messages.length && (
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
        )) || (
          <div className="flex items-center justify-center min-h-screen relative">
            {directions && (
              <div
                className="absolute z-10 py-1 px-3 bg-white rounded-full border font-semibold cursor-pointer"
                style={{ top: 10 + "em", left: 0.8 + "em" }}
                onClick={() => {
                  setAnimation("fadeIn");
                  setDirections(false);
                }}
              >
                Return
              </div>
            )}
            <div className={`bg-white shadow rounded w-1/3 min-h-1/2 z-10 p-6 animated ${animation}`}>
              {(!game && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
                <div className="flex items-center justify-center mb-6">
                  <div className="leading-none font-semibold -mt-20 p-2 rounded-full text-white bg-transparent relative">
                    <img src={`/icons/sport-icons/${game.sport.icon}.svg`} className="w-24" />
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
              {(false && !game && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
                <div className="flex justify-between items-stretch text-center shadow rounded-lg">
                  <div className="w-1/3 flex flex-col">
                    <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">we need</span>
                    {(!game && <Skeleton active paragraph={false} />) || (
                      <div className="text-2xl w-full leading-none py-1">
                        {/* <span className="leading-none">{request.need - request.acceptedPlusOnes.length}</span>
                    <small className="text-gray-400 text-xs">/{request.need}</small> */}
                      </div>
                    )}
                  </div>
                  <div className="w-1/3 flex flex-col border-l border-r">
                    <span className="uppercase text-xs text-gray-500 bg-gray-200 border-b">accepted</span>
                    <div className="text-2xl w-full leading-none py-1">
                      {/* <span className="leading-none">{request.acceptedPlusOnes ? request.acceptedPlusOnes.length : 0}</span> */}
                      {/* <small className="text-gray-400 text-xs">/{request.game.subs.number * 2}</small> */}
                    </div>
                  </div>
                  <div className="w-1/3 flex flex-col">
                    <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tr border-b">interested</span>
                    <div className="text-2xl w-full leading-none py-1">
                      {/* <span className="leading-none">{request.plusOnes ? request.plusOnes.length : 0}</span> */}
                      {/* <small className="text-gray-400 text-xs">/{game.subs.number}</small> */}
                    </div>
                  </div>
                </div>
              )}
              {(!game && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-4" />) || (
                <div className="flex flex-col justify-center items-stretch text-center shadow rounded-lg mt-4 py-2">
                  <span className="text-gray-400 font-light text-sm leading-none">on</span>
                  <span className="text-2xl font-semibold">{formatRelative(new Date(game.schedule), Date.now())}</span>
                </div>
              )}
              <button
                className="w-full mt-4 bg-winid-1 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-winid-4 hover:border-blue-700 rounded"
                onClick={() => {
                  setAnimation("fadeOut");
                  setDirections(true);
                }}
              >
                Get Directions
              </button>
              <div className="text-center mt-2">
                <div className="leading-none text-winid-1 font-semibold py-3">Wanna play?</div>
                <div className="flex items-center">
                  <button className="w-1/2 bg-transparent hover:bg-winid-1 text-winid-1 font-semibold hover:text-white py-1 px-4 border border-winid-1 hover:border-transparent rounded">
                    Login
                  </button>
                  <span className="px-3 text-gray-400">or</span>
                  <button className="w-1/2 bg-transparent hover:bg-winid-1 text-winid-1 font-semibold hover:text-white py-1 px-4 border border-winid-1 hover:border-transparent rounded">
                    Register
                  </button>
                </div>
              </div>
            </div>
            {game && (
              <Map
                zoom={18}
                lat={game.location.location.coordinates[1]}
                lng={game.location.location.coordinates[0]}
                showDirections={directions}
                showMarkers={false}
                isInteractive={directions}
                classes="absolute left-0 top-0 w-full h-full z-0"
              ></Map>
            )}
          </div>
        )}
      <div className="flex flex-wrap items-stretch min-h-screen">
        <div className="w-1/3 border-r min-h-screen bg-white">
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
          <div className="w-full bg-gray-white px-4 mb-4">
            <div className="bg-white rounded shadow p-4">
              <button onClick={() => handleDeleteGame()}>Delete Game</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GameView;
