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

function SurveyQuestions({ questions }) {
  const [surQuestions, setsurQuestions] = useState([...questions]);
  const addQuestion = () => {
    setsurQuestions([...surQuestions, "write your question"]);
  };
  return (
    <div className="survey-questions">
      {surQuestions.map((question) => (
        <Card
          key={Math.random()}
          style={{ borderLeft: "3px solid blue", marginBottom: "40px" }}
        >
          <CardContent id="cardContent">
            <TextField
              id="filled-textarea"
              label={question}
              placeholder=""
              multiline
              variant="filled"
            />
            <SelectVariants />
          </CardContent>
          <CardContent id="cardbutton">
            <Button variant="contained" startIcon={<EditIcon />}>
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
      <Fab
        color="primary"
        aria-label="add"
        id="addquestion-btn"
        onClick={addQuestion}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

SurveyQuestions.defaultProps = {
  questions: [
    "write your question",
    "write your question",
    "write your question",
  ],
};
export default SurveyQuestions;

function SelectVariants() {
  const [choice, setChoice] = useState("");

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={choice}
          onChange={handleChange}
          label="Choice"
        >
          <MenuItem value="check box">Check box</MenuItem>
          <MenuItem value="Multiple choice">Multiple choice</MenuItem>
          <MenuItem value="Text">Text</MenuItem>
          <MenuItem value="Number">Number</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
