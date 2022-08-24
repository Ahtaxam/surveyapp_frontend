import React from "react";
import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import QUESTIONS_TYPE from "../../Constants/QUESTIONS_TYPES";

function EditOptions({
  options,
  selectedType,
  questionNo,
  handleAddOption,
  handleOptionValue,
  handleDeleteOption,
}) {
  const setOptionInputValue = (e, index, questionNo) => {
    handleOptionValue({
      value: e.target.value,
      index: index,
      questionNo: questionNo,
    });
  };

  // this function is used to add new option for a particular question and pass that data to parent component
  const addOptions = () => {
    handleAddOption(questionNo, options.length);
  };

  // this function is used to delete a specific option for a particular question and pass that data to parent component
  const deleteOptionIndex = (index, questionNo) => {
    handleDeleteOption(index, questionNo);
  };
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} style={{ display: "flex", gap: "10px" }}>
          {[QUESTIONS_TYPE.CHECKBOX, QUESTIONS_TYPE.MULTIPLECHOICE].includes(
            selectedType
          ) && (
            <input
              type={
                selectedType === QUESTIONS_TYPE.MULTIPLECHOICE
                  ? "radio"
                  : selectedType
              }
              style={{ marginTop: "10px" }}
              name="name"
            />
          )}
          &nbsp;&nbsp;&nbsp;
          {[QUESTIONS_TYPE.CHECKBOX, QUESTIONS_TYPE.MULTIPLECHOICE].includes(
            selectedType
          ) ? (
            <TextField
              variant="standard"
              multiline
              type="text"
              className="option-input"
              value={option}
              onChange={(e) => setOptionInputValue(e, index, questionNo)}
            />
          ) : (
            "Give answer"
          )}
          {index > 0 && (
            <DeleteForeverRoundedIcon
              id="delete-option"
              onClick={() => deleteOptionIndex(index, questionNo)}
            />
          )}
        </div>
      ))}

      {[QUESTIONS_TYPE.CHECKBOX, QUESTIONS_TYPE.MULTIPLECHOICE].includes(
        selectedType
      ) && (
        <Button
          id="question-option-add-button"
          startIcon={<Add />}
          variant="contained"
          onClick={addOptions}
        >
          Add
        </Button>
      )}
    </div>
  );
}

export default EditOptions;
