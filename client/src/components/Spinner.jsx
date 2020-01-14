import React from "react";

const Spinner = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-gray-300 rounded-lg w-20 h-20 py-2 animated infinite flash flex items-center">
        <img src="/icons/logo.svg" alt="" className="h-10 mx-auto" />
      </div>
    </div>
  );
};

export default Spinner;
