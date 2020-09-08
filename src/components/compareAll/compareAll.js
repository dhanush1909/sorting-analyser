import React from "react";
import Bar from "../bars/bar/Bar";
import classes from "./compareAll.module.css";

function compareAll(props) {
  return (
    <div className={classes.superContainer}>
      <div className={classes.compareAllContainer}>
        <div className={classes.barsContainer + " bubbleSort"}>
          {props.arr.map((num, index) => {
            return (
              <Bar number={num} key={index} width={50 / props.arr.length}></Bar>
            );
          })}
        </div>
        <h3>Bubble Sort</h3>
      </div>
      <div className={classes.compareAllContainer}>
        <div className={classes.barsContainer + " mergeSort"}>
          {props.arr.map((num, index) => {
            return (
              <Bar number={num} key={index} width={50 / props.arr.length}></Bar>
            );
          })}
        </div>
        <h3>Merge Sort</h3>
      </div>
      <div className={classes.compareAllContainer}>
        <div className={classes.barsContainer + " selectionSort"}>
          {props.arr.map((num, index) => {
            return (
              <Bar number={num} key={index} width={50 / props.arr.length}></Bar>
            );
          })}
        </div>
        <h3>Selection Sort</h3>
      </div>
    </div>
  );
}

export default compareAll;
