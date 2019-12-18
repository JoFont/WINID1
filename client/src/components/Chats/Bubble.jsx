import React from "react";
import { formatDistanceToNow } from "date-fns";

const Bubble = props => {
  const message = props.message;
  return (
    <div className="w-1/2 mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="-mb-6 flex items-center">
          <img src={message.photoUrl} alt="" className="rounded-full w-10 ml-2 shadow z-10" />
          <span className="text-gray-700 font-bold uppercase text-s leading-none bg-white rounded pl-3 pr-2 py-1 shadow -ml-2 z-0">
            {message.displayName}
          </span>
        </div>
        <span className="text-gray-400 leading-none text-xs">{message.date && formatDistanceToNow(message.date.seconds, 'MMM')}</span>
      </div>
      <div className="bg-white p-4 shadow rounded-l-lg rounded-tr-lg">
        <div className="w-full leading-tight text-base mt-3">{message.text}</div>
      </div>
    </div>
  );
};

export default Bubble;
