import React from "react";
import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import QUESTIONS_TYPE from "../../Constants/QUESTIONS_TYPES";

function Options({
  selectedType,
  options,
  setInputValue,
  setAddOption,
  deleteOption,
  cardNo,
}) {
  // this function set value of option for a particular question and pass that data to parent component
  const setOptionInputValue = (e, index, cardNo) => {
    setInputValue({ value: e.target.value, index: index, cardNo: cardNo });
  };

  // this function is used to add new option for a particular question and pass that data to parent component
  const addOptions = () => {
    setAddOption(cardNo, options.length);
  };

  // this function is used to delete a specific option for a particular question and pass that data to parent component
  const deleteOptionIndex = (index, cardNo) => {
    deleteOption(index, cardNo);
  };

  //component to render options for a particular question
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} style={{ display: "flex", gap: "10px" }}>
          {[QUESTIONS_TYPE.CHECKBOX, QUESTIONS_TYPE.MULTIPLE_CHOICE].includes(
            selectedType
          ) && (
            <input
              type={
                selectedType === QUESTIONS_TYPE.MULTIPLE_CHOICE
                  ? "radio"
                  : selectedType
              }
              style={{ marginTop: "10px" }}
              name="name"
            />
          )}
          &nbsp;&nbsp;&nbsp;
          {[QUESTIONS_TYPE.CHECKBOX, QUESTIONS_TYPE.MULTIPLE_CHOICE].includes(
            selectedType
          ) ? (
            <TextField
              variant="standard"
              multiline
              type="text"
              className="option-input"
              onChange={(e) => {
                setOptionInputValue(e, index, cardNo);
              }}
              value={`${options[index]}`}
            />
          ) : (
            "Give answer"
          )}
          {index > 0 && (
            <DeleteForeverRoundedIcon
              id="delete-option"
              onClick={() => deleteOptionIndex(index, cardNo)}
            />
          )}
        </div>
      ))}

      {[QUESTIONS_TYPE.CHECKBOX, QUESTIONS_TYPE.MULTIPLE_CHOICE].includes(
        selectedType
      ) && (
        <Button
          onClick={addOptions}
          id="question-option-add-button"
          startIcon={<Add />}
          variant="contained"
        >
          Add
        </Button>
      )}
    </div>
  );
}

export default Options;
