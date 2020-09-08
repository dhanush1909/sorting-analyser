import React from "react";
import Bar from "./bar/Bar";
import classes from "./bars.module.css";

function bars(props) {
  return (
    <div className={classes.barContainer}>
      {props.arr.map((num, index) => {
        return (
          <Bar number={num} key={index} width={50 / props.arr.length}></Bar>
        );
      })}
    </div>
  );
}

export default bars;
