import React from "react";

function NewArrayButton(props) {
  return (
    <button disabled={props.disabled} onClick={props.clicked}>
      New Array
    </button>
  );
}

export default NewArrayButton;
