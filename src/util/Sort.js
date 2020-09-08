export const bubbleSort = arr => {
  let animations = [];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      animations.push([j, j + 1]);
      animations.push([j, arr[j]]);
      animations.push([j + 1, arr[j + 1]]);
      animations.push([j, j + 1]);
    }
  }
  return animations;
};

export const selectionSort = arr => {
  let animations = [];
  const n = arr.length;
  for (var i = 0; i < n; i++) {
    let largest = 0;
    for (var j = 0; j < n - i; j++) {
      if (arr[j] > arr[largest]) {
        largest = j;
      }
      animations.push([-1, j, largest]);
      animations.push([1, j, largest]);
    }
    animations.push([1, j - 1, largest]);
    animations.push([0, arr[largest], arr[j - 1]]);
    let temp = arr[j - 1];
    arr[j - 1] = arr[largest];
    arr[largest] = temp;
  }
  return animations;
};

export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const tempArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, tempArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, tempArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(tempArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(tempArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, tempArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  tempArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (tempArray[i] <= tempArray[j]) {
      animations.push([k, tempArray[i]]);
      mainArray[k++] = tempArray[i++];
    } else {
      animations.push([k, tempArray[j]]);
      mainArray[k++] = tempArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, tempArray[i]]);
    mainArray[k++] = tempArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, tempArray[j]]);
    mainArray[k++] = tempArray[j++];
  }
}
