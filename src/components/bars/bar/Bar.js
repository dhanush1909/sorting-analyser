import React from "react";
import "./BBar.css";

function bar(props) {
  return (
    <div
      className="detailBar"
      style={{ height: `${props.number}px`, width: `${props.width}%` }}
    ></div>
  );
}

export default bar;
