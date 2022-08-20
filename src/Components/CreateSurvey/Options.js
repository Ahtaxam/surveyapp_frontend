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
}) {
  const getInputValue = (e, index) => {
    setInputValue({ value: e.target.value, index: index });
  };
  const addOptions = () => {
    setAddOption(options.length);
  };

  const deleteOptionIndex = (index) => {
    deleteOption(index);
  };
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
            type="text"
            className="option-input"
            onChange={(e) => {
              getInputValue(e, index);
            }}
            value={`${options[index]}`}
          />
          {index > 0 && (
            <DeleteForeverRoundedIcon
              id="delete-option"
              onClick={() => deleteOptionIndex(index)}
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
