import React from "react";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function Options({ selectedType, options, setInputValue, setAddOption }) {
  const getInputValue = (e, index) => {
    setInputValue({ value: e.target.value, index: index });
  };
  const addOptions = () => {
    setAddOption(options.length);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          {["checkbox", "multiplechoice"].includes(selectedType) && (
            <input
              type={selectedType === "multiplechoice" ? "radio" : selectedType}
            />
          )}
          &nbsp;&nbsp;&nbsp;
          <input
            type="text"
            className="option-input"
            onChange={(e) => {
              getInputValue(e, index);
            }}
            value={`${options[index]}`}
          />
        </div>
      ))}

      {["checkbox", "multiplechoice"].includes(selectedType) && (
        <Button
          onClick={addOptions}
          id="question-option-add-button"
          startIcon={<Add />}
          variant="contained"
        >
          Add option
        </Button>
      )}
    </div>
  );
}

export default Options;
