import React from "react";
import classes from "./TopBar.module.css";
import {
  AppBar,
  Toolbar,
  Button,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

function TopBar(props) {
  return (
    <AppBar style={{ background: "#b2ebf2" }} position="static">
      <Toolbar>
        <div className={classes.TopBar}>
          <div>
            <Button
              variant="contained"
              color="default"
              onClick={props.genNewArray}
              disabled={props.disableButtons}
            >
              New Array
            </Button>
          </div>
          <div>
            <InputLabel id="label">Sorting Speed</InputLabel>
            <Select
              labelId="label"
              id="select"
              disabled={props.disableButtons}
              value={props.sortSpeed}
              onChange={props.changeSortSpeed}
            >
              <MenuItem value="0.5">Fast</MenuItem>
              <MenuItem value="1">Medium</MenuItem>
              <MenuItem value="2">Slow</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id="label">Array Size</InputLabel>
            <Select
              labelId="label"
              id="select"
              disabled={props.disableButtons}
              value={props.numOfBars}
              onChange={props.changeArraySize}
            >
              <MenuItem value="30">Small</MenuItem>
              <MenuItem value="100">Medium</MenuItem>
              <MenuItem value="200">Large</MenuItem>
            </Select>
          </div>
          <div>
            <Button
              color="secondary"
              onClick={props.bubbleSort}
              disabled={props.disableButtons}
            >
              Bubble Sort
            </Button>
            <Button
              color="secondary"
              onClick={props.mergeSort}
              disabled={props.disableButtons}
            >
              Merge Sort
            </Button>
            <Button
              color="secondary"
              onClick={props.selectionSort}
              disabled={props.disableButtons}
            >
              Selection Sort
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="default"
              onClick={props.compareAllHandler}
              disabled={props.disableButtons}
            >
              Compare All
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
