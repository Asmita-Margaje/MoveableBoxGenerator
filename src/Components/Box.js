import React from "react";
import "./Box.css";

const Box = ({ id, color, onClick, border }) => {
  return (
    <div
      onClick={onClick}
      className="box"
      id={id}
      style={{
        backgroundColor: color,
        color: color,
        border: border,
        zIndex: id + 1,
        position: "relative",
      }}
    ></div>
  );
};

export default Box;
