import React, { useEffect, useState, useGlobal, Fragment } from "reactn";
import { Input, Icon, Empty, Skeleton, Spin } from "antd";
import { Link } from "react-router-dom";
import { formatRelative } from "date-fns";
import { getById as getRequestById, joinPlusOnes, acceptPlusOne } from "../services/api/request";
import { sendChatMessage, messageRenderToFalse } from "../services/chat";
import Bubble from "../components/Chats/Bubble";
import Map from "../components/Maps/Map";

const RequestView = props => {
  const [userToken] = useGlobal("userToken");
  const [game, setGame] = useState();
  const [request, setRequest] = useState();
  const [fire] = useGlobal("fire");
  const [player] = useGlobal("player");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [directions, setDirections] = useState(false);

  const buildRequest = async () => {
    const response = await getRequestById(userToken, props.match.params.id);
    setRequest(response.data);
    if (userToken) {
      fire
        .firestore()
        .collection("chatGroups")
        .doc(response.data.chatRef)
        .collection("messages")
        .orderBy("date")
        .onSnapshot(querySnapshot => {
          const allMessages = [];
          querySnapshot.forEach(async doc => {
            if (doc.data().render) {
              await messageRenderToFalse(fire, response.data.chatRef, doc.id);
              await buildRequest();
            }
            allMessages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(allMessages);
          if (allMessages && allMessages.length > 0) {
            const element = document.getElementById("chat");
            element.scrollTop = element.scrollHeight + element.clientHeight;

            const lastBubble = document.querySelector(".bubble:last-of-type");
            lastBubble.classList.add("animated", "fadeInUp", "faster");
          }
        });
    }
  };

  const addMessage = async e => {
    if (e.key === "Enter" && e.target.value !== "") {
      await sendChatMessage(fire, request.chatRef, {
        photoUrl: player.photoUrl,
        text: inputMessage,
        displayName: player.displayName,
        username: player.username,
        playerId: player._id
      });
      setInputMessage("");
    }
  };

  const handleJoin = async e => {
    const response = await joinPlusOnes(fire, userToken, request._id, player);
    setRequest(response.data);
  };

  const handleAccept = async plusOne => {
    const response = await acceptPlusOne(fire, userToken, request._id, plusOne, player);
    setRequest(response.data);
  };

  const checkAccepted = plusOne => {
    return request.acceptedPlusOnes.reduce((validate, acceptedPlusOne) => {
      return acceptedPlusOne._id === plusOne._id ? !validate : validate;
    }, false);
  };

  const checkAdmin = () => {
    return request.admins.reduce((validate, admin) => {
      return player._id === admin._id ? !validate : validate;
    }, false);
  };

  useEffect(() => {
    // sem if, porque isto é publico
    buildRequest();
  }, [userToken]);

  return (
    (player === undefined && <Spin />) ||
    (player !== null && (
      <div className="flex flex-wrap items-stretch min-h-screen">
        {/* Inicio do ASIDE */}
        <div className="w-1/3 border-r min-h-screen bg-white">
          <div
            className="h-32 bg-gray-300 relative"
            style={{
              background:
                "url(https://api.mapbox.com/styles/v1/jofont/ck48k2a7l0hci1co0xskrj9xl/static/-9.1306,38.719,15,0,60/300x300?access_token=pk.eyJ1Ijoiam9mb250IiwiYSI6ImNrNDBiOWtxaTAwNzUzbW44NmpiajZ5cXEifQ.pyznAM2ns-_4WLz-DuZEAg)"
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
            {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
              <div className="flex items-center justify-center mb-6">
                <div className="leading-none font-semibold -mt-20 p-2 rounded-full bg-white shadow text-white bg-white relative border">
                  <img src={`/icons/sport-icons/${request.game.sport.icon}.svg`} className="w-24" />
                  <div
                    className="leading-none font-semibold -mt-6 -ml-6 rounded-full bg-white p-2 shadow text-white bg-winid-1 absolute"
                    style={{ right: -0.25 + "em", bottom: -0.25 + "em" }}
                  >
                    <span className="text-2xl">{request.game.price.value / 100}</span>
                    <small className="text-gray-300 text-xs">€</small>
                    {/* TODO: {request.game.price.currency} => CONVERT CURRENCY IN THE FUTURE*/}
                  </div>
                </div>
              </div>
            )}
            {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
              <div className="flex justify-between items-stretch text-center shadow rounded-lg">
                <div className="w-1/3 flex flex-col">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">we need</span>
                  {(!request.acceptedPlusOnes && <Skeleton active paragraph={false} />) || (
                    <div className="text-2xl w-full leading-none py-1">
                      <span className="leading-none">{request.need - request.acceptedPlusOnes.length}</span>
                      <small className="text-gray-400 text-xs">/{request.need}</small>
                    </div>
                  )}
                </div>
                <div className="w-1/3 flex flex-col border-l border-r">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 border-b">accepted</span>
                  <div className="text-2xl w-full leading-none py-1">
                    <span className="leading-none">
                      {request.acceptedPlusOnes ? request.acceptedPlusOnes.length : 0}
                    </span>
                    {/* <small className="text-gray-400 text-xs">/{request.game.subs.number * 2}</small> */}
                  </div>
                </div>
                <div className="w-1/3 flex flex-col">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tr border-b">interested</span>
                  <div className="text-2xl w-full leading-none py-1">
                    <span className="leading-none">{request.plusOnes ? request.plusOnes.length : 0}</span>
                    {/* <small className="text-gray-400 text-xs">/{game.subs.number}</small> */}
                  </div>
                </div>
              </div>
            )}
            {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-4" />) || (
              <div className="flex flex-col justify-center items-stretch text-center shadow rounded-lg mt-4 py-2">
                {console.log("REQUEST", request)}
                <span className="text-gray-400 font-light text-sm leading-none">on</span>
                <span className="text-2xl font-semibold">
                  {formatRelative(new Date(request.game.schedule), Date.now())}
                </span>
              </div>
            )}
          </div>

          {request && request.acceptedPlusOnes.length > 0 && (
            <div className="w-full mb-2 px-6">
              <div className="uppercase text-gray-400 font-semibold text-xs flex items-center mb-1">
                <span>Confirmed</span>
                <Icon type="down" className="ml-1" />
              </div>

              <div className="bg-white rounded shadow">
                {request &&
                  request.acceptedPlusOnes &&
                  request.acceptedPlusOnes.map((acceptedPlusOne, index) => {
                    return (
                      <div
                        key={acceptedPlusOne._id}
                        className={`flex items-center justify-start pl-2 pr-4 py-2 rounded ${
                          index % 2 !== 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <img src={acceptedPlusOne.photoUrl} className="rounded-full w-6 mr-3" alt="" />
                        <Link to={"/player/" + acceptedPlusOne.username}>{acceptedPlusOne.displayName}</Link>
                        <Icon type="check-circle" className="text-green-500 text-lg ml-auto" />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {request &&
            !(request.plusOnes.length === request.acceptedPlusOnes.length) &&
            request.admins.reduce((validate, admin) => {
              return player._id === admin._id ? !validate : validate;
            }, false) && (
              <div className="w-full p-6 mb-4">
                <div className="uppercase text-gray-400 font-semibold text-xs flex items-center mb-1">
                  <span>Waiting Confirmation</span>
                  <Icon type="down" className="ml-1" />
                </div>
                <div className="bg-white rounded shadow">
                  {request &&
                    request.plusOnes &&
                    request.plusOnes.map((plusOne, index) => {
                      if (!checkAccepted(plusOne)) {
                        return (
                          <div
                            key={plusOne._id}
                            className={`flex items-center justify-start pl-2 pr-4 py-2 rounded even:bg-gray-100`}
                          >
                            <img src={plusOne.photoUrl} className="rounded-full w-6 mr-3" alt="" />
                            <Link to={"/player/" + plusOne.username}>{plusOne.displayName}</Link>
                            <Icon
                              type="plus-circle"
                              className="text-gray-400 cursor-pointer hover:text-green-500 text-lg ml-auto"
                            />
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            )}
          {request && !checkAdmin() && checkAccepted(player) && (
            <div className="p-6">
              <button
                className="w-full mt-4 bg-winid-1 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-winid-4 hover:border-blue-700 rounded"
                onClick={handleJoin}
              >
                I'm ready to play!
              </button>
            </div>
          )}
        </div>
        <div className="w-2/3 relative h-screen max-h-screen flex flex-col justify-stretch items-stretch">
          {(request &&
            request.plusOnes.reduce((validator, plusOne) => {
              return plusOne.player === player._id ? !validator : validator;
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
          {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
            <div className="flex items-center justify-center mb-6">
              <div className="leading-none font-semibold -mt-20 p-2 rounded-full bg-white shadow text-white bg-white relative border">
                <img src={`/icons/sport-icons/${request.game.sport.icon}.svg`} className="w-24" />
                <div
                  className="leading-none font-semibold -mt-6 -ml-6 rounded-full bg-white p-2 shadow text-white bg-winid-1 absolute"
                  style={{ right: -0.25 + "em", bottom: -0.25 + "em" }}
                >
                  <span className="text-2xl">{request.game.price.value / 100}</span>
                  <small className="text-gray-300 text-xs">€</small>
                  {/* TODO: {request.game.price.currency} => CONVERT CURRENCY IN THE FUTURE*/}
                </div>
              </div>
            </div>
          )}
          {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
            <div className="flex justify-between items-stretch text-center shadow rounded-lg">
              <div className="w-1/3 flex flex-col">
                <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">we need</span>
                {(!request.acceptedPlusOnes && <Skeleton active paragraph={false} />) || (
                  <div className="text-2xl w-full leading-none py-1">
                    <span className="leading-none">{request.need - request.acceptedPlusOnes.length}</span>
                    <small className="text-gray-400 text-xs">/{request.need}</small>
                  </div>
                )}
              </div>
              <div className="w-1/3 flex flex-col border-l border-r">
                <span className="uppercase text-xs text-gray-500 bg-gray-200 border-b">accepted</span>
                <div className="text-2xl w-full leading-none py-1">
                  <span className="leading-none">{request.acceptedPlusOnes ? request.acceptedPlusOnes.length : 0}</span>
                  {/* <small className="text-gray-400 text-xs">/{request.game.subs.number * 2}</small> */}
                </div>
              </div>
              <div className="w-1/3 flex flex-col">
                <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tr border-b">interested</span>
                <div className="text-2xl w-full leading-none py-1">
                  <span className="leading-none">{request.plusOnes ? request.plusOnes.length : 0}</span>
                  {/* <small className="text-gray-400 text-xs">/{game.subs.number}</small> */}
                </div>
              </div>
            </div>
          )}
          {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-4" />) || (
            <div className="flex flex-col justify-center items-stretch text-center shadow rounded-lg mt-4 py-2">
              {console.log("REQUEST", request)}
              <span className="text-gray-400 font-light text-sm leading-none">on</span>
              <span className="text-2xl font-semibold">
                {formatRelative(new Date(request.game.schedule), Date.now())}
              </span>
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
        {request && (
          <Map
            zoom={18}
            lat={request.game.location.location.coordinates[1]}
            lng={request.game.location.location.coordinates[0]}
            showDirections={directions}
            showMarkers={false}
            isInteractive={directions}
            classes="absolute left-0 top-0 w-full h-full z-0"
          ></Map>
        )}
      </div>
    )
  );
};

export default RequestView;
