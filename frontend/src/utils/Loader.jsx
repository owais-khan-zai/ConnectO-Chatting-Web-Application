import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="w-[90px] h-[85px] border-8 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
