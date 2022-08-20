import React, { useState } from "react";
import { Card, CardContent, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";

import QUESTION_TYPE from "../../Constants/QUESTIONS_TYPES";
import Options from "./Options";

function SurveyQuestions({ questions }) {
  const [selectedType, setSelectedType] = useState(
    QUESTION_TYPE.MULTIPLECHOICE
  );
  const [SurveyQuestions, setSurveyQuestions] = useState(questions);

  const getInputValue = (e, index) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[index].title = e.target.value;
    setSurveyQuestions(surQuestions);
  };

  const setSelectedOption = (selected) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[surQuestions.length - 1].type = selected;
    if (selected === QUESTION_TYPE.NUMBER) {
      surQuestions[surQuestions.length - 1].options = [12];
    } else if (selected === QUESTION_TYPE.TEXT) {
      surQuestions[surQuestions.length - 1].options = ["short text"];
    } else {
      surQuestions[surQuestions.length - 1].options = ["option1"];
    }
    setSurveyQuestions(surQuestions);
    setSelectedType(selected);
  };

  const setInputValue = (values) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[surQuestions.length - 1].options[values.index] = values.value;
    setSurveyQuestions(surQuestions);
  };

  const setAddOption = (length) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[surQuestions.length - 1].options.push("option" + (length + 1));
    setSurveyQuestions(surQuestions);
  };

  const deleteOption = (index) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[surQuestions.length - 1].options.splice(index, 1);

    setSurveyQuestions(surQuestions);
  };

  const addQuestion = () => {
    console.log(SurveyQuestions);
  };

  return (
    <div className="survey-questions">
      {SurveyQuestions.map((question, index) => (
        <Card
          key={index}
          style={{ borderLeft: "3px solid blue", marginBottom: "40px" }}
        >
          <CardContent id="cardContent">
            <TextField
              id="filled-textarea"
              label="write your question"
              placeholder=""
              multiline
              variant="filled"
              onChange={(e) => {
                getInputValue(e, index);
              }}
              value={question.title}
            />
            <SelectVariants
              selectedType={selectedType}
              onSelectOption={setSelectedOption}
            />
          </CardContent>
          <CardContent id="question-option">
            <Options
              selectedType={selectedType}
              options={question.options}
              setInputValue={setInputValue}
              setAddOption={setAddOption}
              deleteOption={deleteOption}
            />
          </CardContent>

          <CardContent id="cardbutton">
            <Button value={index} variant="contained" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              sx={{ color: "red" }}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      <Fab color="primary" aria-label="add" id="addquestion-btn">
        <AddIcon onClick={addQuestion} />
      </Fab>
      <ToastContainer />
    </div>
  );
}

SurveyQuestions.defaultProps = {
  questions: [
    {
      title: "",
      type: QUESTION_TYPE.MULTIPLECHOICE,
      options: ["option1"],
    },
  ],
};

export default SurveyQuestions;

function SelectVariants({ selectedType, onSelectOption }) {
  const handleChange = (event) => {
    onSelectOption(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedType}
          onChange={handleChange}
          label="Choice"
        >
          <MenuItem value={QUESTION_TYPE.CHECKBOX}>checkbox</MenuItem>
          <MenuItem value={QUESTION_TYPE.MULTIPLECHOICE}>
            multiple choice
          </MenuItem>
          <MenuItem value={QUESTION_TYPE.TEXT}>text</MenuItem>
          <MenuItem value={QUESTION_TYPE.NUMBER}>number</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
