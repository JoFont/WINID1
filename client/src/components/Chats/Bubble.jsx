import React, { useGlobal, Fragment } from "reactn";
import { formatDistanceToNow } from "date-fns";
import { Icon } from "antd";

const Bubble = props => {
  const [player] = useGlobal("player");
  const message = props.message;
  return (
    <Fragment>
      {(!message.isNotification && (
        <div className={message.playerId === player._id ? "ml-auto w-2/5 mb-6" : "w-2/5 mb-6"}>
          <div className="flex justify-between items-center mb-1">
            <div className="-mb-6 flex items-center">
              <img src={message.photoUrl} alt="" className="rounded-full w-10 ml-2 shadow z-10" />
              <span className="text-gray-700 font-bold uppercase text-s leading-none bg-white rounded pl-3 pr-2 py-1 shadow -ml-2 z-0">
                {message.displayName}
              </span>
            </div>
            <span className="text-gray-400 leading-none text-xs">
              {message.date && formatDistanceToNow(message.date.toMillis(), { addSuffix: true })}
            </span>
          </div>
          <div
            className={
              message.playerId === player._id
                ? "bg-white p-4 shadow rounded-l-lg rounded-tr-lg"
                : "bg-white p-4 shadow rounded-r-lg rounded-tl-lg"
            }
          >
            <div className="w-full leading-tight text-base mt-3">{message.text}</div>
          </div>
        </div>
      )) || (
        <div className="mx-auto w-1/3 mb-6">
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
