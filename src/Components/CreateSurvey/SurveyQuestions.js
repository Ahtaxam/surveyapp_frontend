import React, { useState } from "react";
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

import QUESTION_TYPE from "../../Constants/QUESTIONS_TYPES";
import Options from "./Options";

function SurveyQuestions({ questions }) {
  const [SurveyQuestions, setSurveyQuestions] = useState(questions);

  // this function is used to add new question to the survey
  const setQuestionValue = (e, index) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[index].title = e.target.value;
    setSurveyQuestions(surQuestions);
  };

  // this function set options selected type for each question
  const setSelectedOption = (cardNo, selected, previousType) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[cardNo].type = selected;
    if (selected === QUESTION_TYPE.NUMBER) {
      surQuestions[cardNo].options = [0];
    } else if (selected === QUESTION_TYPE.TEXT) {
      surQuestions[cardNo].options = ["short text"];
    } else {
      SurveyQuestions[cardNo].options = ["option1"];
    }

    setSurveyQuestions(surQuestions);
  };

  // this is callback back that is invoked by child to set options value for a particular questio
  const setInputValue = (values) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[values.cardNo].options[values.index] = values.value;
    setSurveyQuestions(surQuestions);
  };

  // this is callback back that is invoked by child to add new option for a particular question
  const setAddOption = (cardNo, length) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[cardNo].options.push("option" + (length + 1));
    setSurveyQuestions(surQuestions);
  };

  // this is callback back that is invoked by child to delete a specific option for a particular question
  const deleteOption = (index, cardNo) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions[cardNo].options.splice(index, 1);

    setSurveyQuestions(surQuestions);
  };

  // this function is used to copy a particular question on which user clicked and add it to the survey
  const copyQuestion = (QuestionIndex) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions.splice(QuestionIndex + 1, 0, {
      ...surQuestions[QuestionIndex],
    });
    surQuestions[QuestionIndex + 1].options = [
      ...surQuestions[QuestionIndex].options,
    ];

    setSurveyQuestions(surQuestions);
  };

  // this function is used to delete a particular question on which user clicked and delete it from the survey
  const deleteQuestion = (QuestionIndex) => {
    const surQuestions = [...SurveyQuestions];
    surQuestions.splice(QuestionIndex, 1);
    setSurveyQuestions(surQuestions);
  };

  // this function is used to add new question to the survey
  const addQuestion = () => {
    const surQuestions = [...SurveyQuestions];
    surQuestions.push({
      title: "",
      type: QUESTION_TYPE.MULTIPLECHOICE,
      options: ["option1"],
    });
    setSurveyQuestions(surQuestions);
  };

  // component render function
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
              <IconButton onClick={() => copyQuestion(index)}>
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
      type: QUESTION_TYPE.MULTIPLECHOICE,
      options: ["option1"],
    },
  ],
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
