import React from "react";
import { PulseLoader } from "react-spinners";

const Loading2 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1000,
        top: 0,
        left: 0,
      }}
    >
      <PulseLoader color="#357b83" size={10} />
    </div>
  );
};

export default Loading2;
