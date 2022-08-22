import React from "react";
import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

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
          {["checkbox", "multiplechoice"].includes(selectedType) && (
            <input
              type={selectedType === "multiplechoice" ? "radio" : selectedType}
              style={{ marginTop: "10px" }}
            />
          )}
          &nbsp;&nbsp;&nbsp;
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
          {index > 0 && (
            <DeleteForeverRoundedIcon
              id="delete-option"
              onClick={() => deleteOptionIndex(index, cardNo)}
            />
          )}
        </div>
      ))}

      {["checkbox", "multiplechoice"].includes(selectedType) && (
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
