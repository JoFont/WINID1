import React, { useEffect, useState, useGlobal, Fragment } from "reactn";
import { Input, Icon, Empty, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { getById as getRequestById, joinPlusOnes, acceptPlusOne } from "../services/api/request";
import { sendChatMessage, messageRenderToFalse } from "../services/chat";
import Bubble from "../components/Chats/Bubble";

const RequestView = props => {
  const [userToken] = useGlobal("userToken");
  const [game, setGame] = useState();
  const [request, setRequest] = useState();
  const [fire] = useGlobal("fire");
  const [player] = useGlobal("player");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const buildRequest = async () => {
    const response = await getRequestById(userToken, props.match.params.id);
    setRequest(response.data);

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

  useEffect(() => {
    if (userToken) {
      buildRequest();
    }
  }, [userToken]);

  return (
    <div className="flex flex-wrap items-stretch min-h-screen">
      <div className="w-1/3 border-r min-h-screen bg-white">
        {/* {game && <img src={game.location.locationPhotoUrl} alt="" className="w-full" />} */}
        <div className="w-full p-4">
          <div className="bg-white rounded shadow">
            {(!request && <Skeleton active paragraph={false} className="px-4 pb-4 shadow mt-0" />) || (
              <div className="flex justify-between items-stretch text-center">
                <div className="w-1/3 flex flex-col">
                  <span className="uppercase text-xs text-gray-500 bg-gray-200 rounded-tl border-b">we need</span>
                  {(!request.acceptedPlusOnes && <Skeleton active paragraph={false} />) || (
                    <div className="text-2xl w-full leading-none py-1">
                      <span className="leading-none">{request.need - request.acceptedPlusOnes.length}</span>
                      {/* <small className="text-gray-400 text-xs">/{request.startersNumber * 2}</small> */}
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
          </div>
        </div>
        {request &&
          request.admins.reduce((validate, admin) => {
            return player._id === admin._id ? !validate : validate;
          }, false) && (
            <div className="w-full p-4 mb-4">
              <div className="bg-white rounded shadow p-4">
                {request &&
                  request.plusOnes &&
                  request.plusOnes.map(plusOne => {
                    return (
                      <div key={player._id} className="flex items-center justify-between">
                        <Link to={"/player/" + plusOne.username}>{plusOne.displayName}</Link>
                        <button onClick={() => handleAccept(plusOne)}>Accept!</button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        <div className="">
          <button className="bg-blue-500 text-white rounded w-full" onClick={handleJoin}>
            Join!
          </button>
        </div>
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
  );
};

export default RequestView;
