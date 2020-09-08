import React, { Component } from "react";
import classes from "./App.module.css";
import BarsContainer from "./components/bars/bars";
import TopBar from "./components/topBar/TopBar";
import * as Sort from "./util/Sort";
import * as ItemSelector from "./util/ItemSelector";
import CompareAll from "./components/compareAll/compareAll";

// This is the main color of the array bars.
const PRIMARY_COLOR = "yellow";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

//actual color of the bars
const ACTUAL_COLOR = "teal";

class App extends Component {
  state = {
    disableSortButton: false,
    array: [],
    numOfBars: 100,
    animationSpeed: 1,
    compareAll: false
  };

  compareAllComplete = true;
  isMergeSortComplete = true;
  isBubbleSortComplete = true;
  isSelectionSortComplete = true;

  componentDidMount() {
    this.generateNewArray();
  }

  generateNewArray = () => {
    var arr = [];
    for (var i = 0; i < this.state.numOfBars; i++) {
      var rand = Math.floor(Math.random() * 700);
      arr[i] = rand;
    }
    this.setState({
      array: arr
    });
  };

  changeArraySize = event => {
    this.setState(
      {
        numOfBars: event.target.value
      },
      () => {
        this.generateNewArray();
      }
    );
  };

  changeSortSpeed = event => {
    this.setState({
      animationSpeed: event.target.value
    });
  };

  compareAllHandler = () => {
    this.compareAllComplete = false;
    this.isMergeSortComplete = false;
    this.isBubbleSortComplete = false;
    this.isSelectionSortComplete = false;
    this.setState({ compareAll: true });
    if (this.state.numOfBars > 100) {
      this.setState({ numOfBars: 100 }, () => {
        this.generateNewArray();
      });
    }
    setTimeout(() => {
      this.dobubbleSort();
      this.doSelectionSort();
      this.doMergeSort();
    }, 100);
  };

  bubbleSortButtonClicked = () => {
    this.setState({ compareAll: false }, () => {
      this.dobubbleSort();
    });
  };

  dobubbleSort = () => {
    let bars;
    let dupArray = this.state.array.slice();
    this.setState({ disableButtons: true });
    let animations = Sort.bubbleSort(dupArray);
    if (this.state.compareAll) {
      bars = ItemSelector.selectBubbleSortBars();
    } else {
      bars = ItemSelector.selectBars();
    }

    for (var i = 0; i < animations.length; i++) {
      if (i % 4 === 0) {
        const firstIdx = animations[i][0];
        const secondIdx = animations[i][1];
        setTimeout(() => {
          bars[firstIdx].style.backgroundColor = PRIMARY_COLOR;
          bars[secondIdx].style.backgroundColor = SECONDARY_COLOR;
        }, i * this.state.animationSpeed);
      } else if (i % 4 === 3) {
        const firstIdx = animations[i][0];
        const secondIdx = animations[i][1];
        setTimeout(() => {
          bars[firstIdx].style.backgroundColor = ACTUAL_COLOR;
          bars[secondIdx].style.backgroundColor = ACTUAL_COLOR;
        }, i * this.state.animationSpeed);
      } else {
        const index = animations[i][0];
        const height = animations[i][1];
        setTimeout(() => {
          bars[index].style.height = `${height}px`;
        }, i * this.state.animationSpeed);
      }
    }

    setTimeout(() => {
      this.isBubbleSortComplete = true;
      if (
        this.isSelectionSortComplete &&
        this.isMergeSortComplete &&
        !this.compareAllComplete
      ) {
        this.compareAllComplete = true;
      }
      this.enabbleButtons(animations.length, dupArray);
    }, animations.length * this.state.animationSpeed);
  };

  enabbleButtons = (n, arr) => {
    if (this.compareAllComplete) {
      this.setState({ disableButtons: false });
      this.setState({ array: arr });
    }
  };

  selectionSortButtonClicked = () => {
    this.setState({ compareAll: false }, () => {
      this.doSelectionSort();
    });
  };

  doSelectionSort = () => {
    let bars;
    this.setState({ disableButtons: true });
    let dupArray = this.state.array.slice();
    let animations = Sort.selectionSort(dupArray);
    if (this.state.compareAll) {
      bars = ItemSelector.selectSelectionSortBars();
    } else {
      bars = ItemSelector.selectBars();
    }
    for (var i = 0; i < animations.length; i++) {
      if (animations[i][0] === -1) {
        let firstIdx = animations[i][1];
        let secondIdx = animations[i][2];
        setTimeout(() => {
          bars[firstIdx].style.backgroundColor = SECONDARY_COLOR;
          bars[secondIdx].style.backgroundColor = PRIMARY_COLOR;
        }, i * this.state.animationSpeed);
      } else if (animations[i][0] === 1) {
        let firstIdx = animations[i][1];
        let secondIdx = animations[i][2];
        setTimeout(() => {
          bars[firstIdx].style.backgroundColor = ACTUAL_COLOR;
          bars[secondIdx].style.backgroundColor = ACTUAL_COLOR;
        }, i * this.state.animationSpeed);
      } else {
        let firstHeight = animations[i][1];
        let secondHeight = animations[i][2];
        let firstIdx = animations[i - 1][1];
        let secondIdx = animations[i - 1][2];
        setTimeout(() => {
          bars[firstIdx].style.height = `${firstHeight}px`;
          bars[secondIdx].style.height = `${secondHeight}px`;
        }, i * this.state.animationSpeed);
      }
    }
    setTimeout(() => {
      this.isSelectionSortComplete = true;
      if (
        this.isMergeSortComplete &&
        this.isBubbleSortComplete &&
        !this.compareAllComplete
      ) {
        this.compareAllComplete = true;
      }
      this.enabbleButtons(animations.length, dupArray);
    }, animations.length * this.state.animationSpeed);
  };

  mergeSortButtonClicked = () => {
    this.setState({ compareAll: false }, () => {
      this.doMergeSort();
    });
  };

  doMergeSort = () => {
    let bars;
    this.setState({ disableButtons: true });
    let dupArray = this.state.array.slice();
    let animations = Sort.mergeSort(dupArray);
    if (this.state.compareAll) {
      bars = ItemSelector.selectMergeSortBars();
    } else {
      bars = ItemSelector.selectBars();
    }
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = bars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.animationSpeed);
      }
    }
    for (let i = 0; i < bars.length; i++) {
      setTimeout(() => {
        bars[i].style.backgroundColor = ACTUAL_COLOR;
      }, i + animations.length * this.state.animationSpeed);
    }

    setTimeout(() => {
      this.isMergeSortComplete = true;
      if (
        this.isSelectionSortComplete &&
        this.isBubbleSortComplete &&
        !this.compareAllComplete
      ) {
        this.compareAllComplete = true;
      }
      this.enabbleButtons(animations.length, dupArray);
    }, animations.length * this.state.animationSpeed);
  };

  render() {
    return (
      <div className={classes.App}>
        <TopBar
          bubbleSort={this.bubbleSortButtonClicked}
          selectionSort={this.selectionSortButtonClicked}
          mergeSort={this.mergeSortButtonClicked}
          disableButtons={this.state.disableButtons}
          genNewArray={this.generateNewArray}
          sortSpeed={this.state.animationSpeed}
          numOfBars={this.state.numOfBars}
          changeSortSpeed={this.changeSortSpeed}
          changeArraySize={this.changeArraySize}
          compareAllHandler={this.compareAllHandler}
        ></TopBar>
        {this.state.compareAll ? (
          <CompareAll arr={this.state.array}></CompareAll>
        ) : (
          <BarsContainer arr={this.state.array}></BarsContainer>
        )}
      </div>
    );
  }
}

export default App;
