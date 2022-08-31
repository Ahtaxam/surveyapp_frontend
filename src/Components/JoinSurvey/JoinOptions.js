import { Input } from "@mui/material";
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

  // function to render multiplechoice options and checkbox options
  function renderOptions() {
    return (
      <div>
        {options.map((option, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <input
              style={{ marginTop: "10px" }}
              type={
                type === QUESTION_TYPES.MULTIPLE_CHOICE ? "radio" : "checkbox"
              }
              name={questionNo}
              onChange={(e) => {
                getSelectedOptions(option, e.target.checked, index, type);
              }}
            />

            <p style={{ marginTop: "10px" }}>{option}</p>
          </div>
        ))}
      </div>
    );
  }

  // function to render text input type
  function renderText() {
    return (
      <div>
        <Input
          placeholder="Enter your answer"
          onChange={(e) => {
            inputTextValues(e);
          }}
        />
      </div>
    );
  }

  // function to render number input type
  function renderNumber() {
    return (
      <div>
        <Input
          placeholder="Enter your answer"
          onChange={(e) => {
            inputNumberValue(e);
          }}
        />
      </div>
    );
  }

  //switch case to render options based on question type
  switch (type) {
    case QUESTION_TYPES.CHECKBOX:
      return renderOptions();
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      return renderOptions();
    case QUESTION_TYPES.TEXT:
      return renderText();
    case QUESTION_TYPES.NUMBER:
      return renderNumber();

    default:
      return;
  }
}

export default JoinOptions;
