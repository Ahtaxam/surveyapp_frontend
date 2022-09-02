import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Typography } from "@mui/material";
import { Card, CardContent, Button } from "@mui/material";
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
import Switch from "@mui/material/Switch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Progress from "../Progress/Progress";

import QUESTION_TYPE from "../../Constants/QUESTIONS_TYPES";
import PATH from "../../Constants/Path";
import EditOptions from "./EditOptions";
import Navbar from "../Navbar/Navbar";
import { authToken } from "../../utils/Authenticate";
const {
  validateSurveyQuestions,
} = require("../CreateSurvey/validateSurveyQuestions");

function EditSurvey() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setPublic] = useState(Boolean);
  const [questions, setQuestions] = useState();
  const [surveyExist, setSurveyExist] = useState(true);
  const { surveyId } = useParams();

  const navigate = useNavigate();

  const updateSurvey = () => {
    if (name.length === 0) {
      toast.error("Please Make Sure You Have A Title ");
      return;
    }
    const [titles, options] = validateSurveyQuestions(questions);
    if (titles && options) {
      const options = {
        method: "PUT",
        url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}/${surveyId}`,
        headers: {
          config: `Bearer ${authToken()}`,
        },
        data: {
          name: name,
          description: description,
          isPublic: isPublic,
          questions: questions,
        },
      };

      axios
        .request(options)
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate(PATH.DASHBOARD);
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Question must be valid");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const options = {
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}/${surveyId}`,
        headers: {
          config: `Bearer ${authToken()}`,
        },
      };
      axios
        .request(options)
        .then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
          setPublic(response.data.isPublic);
          setQuestions(response.data.questions);
        })
        .catch((error) => {
          setSurveyExist(false);
        });
    }, 1000);
  }, [surveyId]);

  const setQuestionValue = (e, index) => {
    const userQuestions = [...questions];
    userQuestions[index].title = e.target.value;
    setQuestions(userQuestions);
  };

  const selectedOption = (questionNo, selectedType, previousValue) => {
    const userQuestions = [...questions];
    userQuestions[questionNo].type = selectedType;
    if (selectedType === QUESTION_TYPE.TEXT) {
      userQuestions[questionNo].options = [];
    } else if (selectedType === QUESTION_TYPE.NUMBER) {
      userQuestions[questionNo].options = [];
    } else if (
      ((selectedType === QUESTION_TYPE.CHECKBOX ||
        selectedType === QUESTION_TYPE.MULTIPLE_CHOICE) &&
        previousValue === QUESTION_TYPE.TEXT) ||
      previousValue === QUESTION_TYPE.NUMBER
    ) {
      userQuestions[questionNo].options = ["option1"];
    }
    setQuestions(userQuestions);
  };

  const setAddOption = (questionNo, length) => {
    const userQuestions = [...questions];
    userQuestions[questionNo].options.push(`option${length + 1}`);
    setQuestions(userQuestions);
  };

  const setOptionInputValue = (value) => {
    const userQuestions = [...questions];
    userQuestions[value.questionNo].options[value.index] = value.value;
    setQuestions(userQuestions);
  };

  const deleteOption = (index, questionNo) => {
    const userQuestions = [...questions];
    userQuestions[questionNo].options.splice(index, 1);
    setQuestions(userQuestions);
  };

  const addQuestion = () => {
    const userQuestions = [...questions];
    userQuestions.push({
      title: "",
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      options: ["option1"],
    });
    setQuestions(userQuestions);
  };

  const deleteQuestion = (index) => {
    const userQuestions = [...questions];
    userQuestions.splice(index, 1);
    setQuestions(userQuestions);
  };

  const copySurveyQuestion = (index) => {
    const userQuestions = [...questions];
    userQuestions.splice(index + 1, 0, {
      ...userQuestions[index],
    });

    userQuestions[index + 1].options = [...userQuestions[index].options];
    setQuestions(userQuestions);
  };

  return (
    <div>
      <Navbar />
      <section className="surveyheader">
        <input
          type="text"
          className="surveyheader__input"
          placeholder="UNTITLED SURVEY"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="filled-textarea"
          placeholder="Form Description"
          multiline
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="switch-button">
          Public
          <Switch
            checked={isPublic}
            onChange={() => setPublic(!isPublic)}
            name="isPublic"
            color="secondary"
          />
        </p>
      </section>
      {surveyExist ? (
        <div className="survey-questions">
          {questions ? (
            questions.map((question, index) => (
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
                    value={question.title}
                    onChange={(e) => {
                      setQuestionValue(e, index);
                    }}
                  />
                  <SelectVariants
                    selectedType={question.type}
                    onSelectOption={selectedOption}
                    questionNo={index}
                  />
                </CardContent>
                <CardContent id="question-option">
                  <EditOptions
                    selectedType={question.type}
                    options={question.options}
                    questionNo={index}
                    handleAddOption={setAddOption}
                    handleOptionValue={setOptionInputValue}
                    handleDeleteOption={deleteOption}
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
            ))
          ) : (
            <Progress />
          )}
          <Fab color="primary" aria-label="add" id="addquestion-btn">
            <AddIcon onClick={addQuestion} />
          </Fab>
        </div>
      ) : (
        <Typography variant="h2" align="center" color="red">
          Survey Does not Exist !
        </Typography>
      )}
      <Button
        id="submit-button"
        style={{
          textAlign: "center",
          width: "180px",
          backgroundColor: "#f50057",
          color: "white",
        }}
        onClick={updateSurvey}
      >
        Update
      </Button>

      <Button
        id="back-button"
        variant="outlined"
        style={{
          textAlign: "center",
          width: "180px",
          color: "#ab003c",
        }}
        onClick={() => navigate(PATH.DASHBOARD)}
      >
        Back
      </Button>
      <ToastContainer />
    </div>
  );
}

export default EditSurvey;

function SelectVariants({ selectedType, onSelectOption, questionNo }) {
  const handleChange = (event) => {
    onSelectOption(questionNo, event.target.value, selectedType);
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
