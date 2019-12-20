import React, { useGlobal, Fragment } from "reactn";
import { formatDistanceToNow } from "date-fns";
import { Icon } from "antd";
import Microlink from "@microlink/react";

const Bubble = props => {
  const [player] = useGlobal("player");
  const message = props.message;

  const checkIfEmoji = string => {
    const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    const emojilessString = string.replace(regex, "");
    return emojilessString.length === 0;
  };

  return (
    <Fragment>
      {(!message.isNotification && (
        <div
          className={
            message.playerId === player._id ? "bubble ml-auto w-1/2 lg:w-2/5 mb-6" : "bubble w-1/2 lg:w-2/5 mb-6"
          }
        >
          <div className="flex justify-between items-center mb-1">
            <div className="-mb-6 flex items-center">
              <img src={message.photoUrl} alt="" className="rounded-full w-10 ml-2 shadow z-10" />
              <span className="text-gray-700 font-bold uppercase text-s leading-none bg-white rounded pl-3 pr-2 py-1 shadow -ml-2 z-0">
                {message.displayName.split(" ")[0]}{" "}
                {message.displayName.split(" ")[message.displayName.split(" ").length - 1].split("")[0]}.
              </span>
            </div>
            <span className="text-gray-400 leading-none text-xs">
              {message.date && formatDistanceToNow(message.date.toMillis(), { addSuffix: true })}
            </span>
          </div>
          <div
            className={`${checkIfEmoji(message.text) ? "" : "bg-white shadow"} p-4 ${
              message.playerId === player._id ? "rounded-l-lg rounded-tr-lg" : "rounded-r-lg rounded-tl-lg"
            }`}
          >
            <div
              className={`w-full leading-tight text-base mt-3 ${
                checkIfEmoji(message.text) ? "text-6xl text-center" : ""
              }`}
            >
              {message.text}
            </div>
          </div>
        </div>
      )) || (
        <div className="bubble mx-auto w-1/3 mb-6">
          <div className="bg-gray-300 py-2 px-4 rounded-full text-xs flex items-center justify-start">
            <Icon type="info-circle" className="mr-2" />
            <div className="w-full leading-none text-xs">
              <span className="block text-gray-700">{message.text}</span>
              <span className="text-gray-500">
                {message.date && formatDistanceToNow(message.date.toMillis(), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Bubble;
