import React from "react";
import { Card, CardContent, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

import QUESTION_TYPE from "../../Constants/QUESTIONS_TYPES";
import Options from "./Options";

function SurveyQuestions({
  questions,
  handleQuestion,
  handleQuestionType,
  handleAddOption,
  handleOptionValue,
  handleDeleteOption,
  handleDeleteQuestion,
  handleAddQuestion,
  copyQuestion,
}) {
  const setQuestionValue = (e, index) => {
    handleQuestion(e.target.value, index);
  };

  const setSelectedOption = (cardNo, selected, previous) => {
    handleQuestionType(selected, cardNo, previous);
  };

  const setInputValue = (values) => {
    handleOptionValue(values);
  };

  const setAddOption = (cardNo, length) => {
    handleAddOption(cardNo, length);
  };

  const deleteOption = (index, cardNo) => {
    handleDeleteOption(index, cardNo);
  };

  const copySurveyQuestion = (questionIndex) => {
    copyQuestion(questionIndex);
  };

  const deleteQuestion = (questionIndex) => {
    handleDeleteQuestion(questionIndex);
  };

  const addQuestion = () => {
    handleAddQuestion();
  };

  // component render function
  return (
    <div className="survey-questions">
      {questions.map((question, index) => (
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
                setQuestionValue(e, index);
              }}
              value={question.title}
            />
            <SelectVariants
              selectedType={question.type}
              onSelectOption={setSelectedOption}
              cardNo={index}
            />
          </CardContent>
          <CardContent id="question-option">
            <Options
              selectedType={question.type}
              options={question.options}
              setInputValue={setInputValue}
              setAddOption={setAddOption}
              deleteOption={deleteOption}
              cardNo={index}
            />
          </CardContent>

          <CardContent id="cardbutton">
            <Tooltip title="copy">
              <IconButton onClick={() => copySurveyQuestion(index)}>
                <ContentCopyIcon></ContentCopyIcon>
              </IconButton>
            </Tooltip>
            <Button
              sx={{ color: "red" }}
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => deleteQuestion(index)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      <Fab color="primary" aria-label="add" id="addquestion-btn">
        <AddIcon onClick={addQuestion} />
      </Fab>
    </div>
  );
}

// component default props
SurveyQuestions.defaultProps = {
  questions: [
    {
      title: "",
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      options: ["option1"],
    },
  ],
};

SurveyQuestions.propTypes = {
  question: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  handleQuestion: PropTypes.func,
  handleQuestionType: PropTypes.func,
  handleAddOption: PropTypes.func,
  handleOptionValue: PropTypes.func,
  handleDeleteOption: PropTypes.func,
  handleDeleteQuestion: PropTypes.func,
  handleAddQuestion: PropTypes.func,
  copyQuestion: PropTypes.func,
};

export default SurveyQuestions;

// this function is used to select a particulat QUESTION TYPE for a particular question and it receive three props and it set Question type for each question accordingly
function SelectVariants({ selectedType, onSelectOption, cardNo }) {
  const handleChange = (event) => {
    onSelectOption(cardNo, event.target.value, selectedType);
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
          <MenuItem value={QUESTION_TYPE.MULTIPLE_CHOICE}>
            multiple choice
          </MenuItem>
          <MenuItem value={QUESTION_TYPE.TEXT}>text</MenuItem>
          <MenuItem value={QUESTION_TYPE.NUMBER}>number</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
