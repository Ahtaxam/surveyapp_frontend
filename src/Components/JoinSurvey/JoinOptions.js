import { Input, TextField } from "@mui/material";
import React from "react";

import QUESTION_TYPES from "../../Constants/QUESTIONS_TYPES";

function JoinOptions({
  options,
  type,
  handleSelectedOptions,
  handleTextValue,
  handleNumberValue,
  questionNo,
}) {
  const getSelectedOptions = (value, isChacked, index, type) => {
    handleSelectedOptions(value, isChacked, index, questionNo, type);
  };

  const inputTextValues = (e) => {
    handleTextValue(e.target.value, questionNo);
  };

  const inputNumberValue = (e) => {
    handleNumberValue(e.target.value, questionNo);
  };

  if (
    type === QUESTION_TYPES.MULTIPLE_CHOICE ||
    type === QUESTION_TYPES.CHECKBOX
  ) {
    return (
      <div>
        {options.map((option, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <input
              style={{ marginTop: "10px" }}
              type={
                type === QUESTION_TYPES.MULTIPLE_CHOICE ? "radio" : "checkbox"
              }
              name="name"
              onChange={(e) => {
                getSelectedOptions(option, e.target.checked, index, type);
              }}
            />

            <p style={{ marginTop: "10px" }}>{option}</p>
          </div>
        ))}
      </div>
    );
  } else if (type === QUESTION_TYPES.TEXT) {
    return (
      <div>
        <Input
          placeholder="Give Answer"
          type="text"
          style={{ marginLeft: "10px" }}
          onBlur={inputTextValues}
        />
      </div>
    );
  } else {
    return (
      <Input
        placeholder="Your Answer"
        type="number"
        style={{ marginLeft: "10px" }}
        onBlur={inputNumberValue}
      />
    );
  }
}

export default JoinOptions;
