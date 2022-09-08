import React, { useState } from "react";
import { Button } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

import ButtonGroup from "@mui/material/ButtonGroup";

import "./graph.css";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);
function ShowGraph({ responses, index, type, options }) {
  const [activeButton, setActiveButton] = useState("Bar");
  const handleType = (value) => {
    setActiveButton(value);
  };
  let result = [];

  const colors = [
    "#5F6F94",
    "#A7D2CB",
    "#0F3460",
    "#42032C",
    "#A66CFF",
    "#FF6384",
    "#36A2EB",
    "#486f27",
    "#FFCE56",
    "#5F6F94",
  ];
  responses.forEach((response) => {
    result.push(...response.answers[index].options);
  });

  let obj = {};
  if (type !== "text") {
    if (type === "number") {
      result.forEach((item) => (obj[item] = 0));
    }
    options.forEach((option) => (obj[option] = 0));

    for (let i of result) {
      obj[i] += 1;
    }
    const data = {
      labels: Object.keys(obj),
      datasets: [
        {
          label: "count",
          data: Object.values(obj),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: colors,

          borderWidth: 1,
        },
      ],
    };

    let optionss = {
      responsive: true,
      scales: {
        y: {
          suggestedMin: 0,
          ticks: {
            precision: 0,
          },
        },
      },
    };

    return (
      <div id="graph">
        {activeButton === "Bar" ? (
          <Bar data={data} options={optionss} />
        ) : (
          <Doughnut data={data} />
        )}
        <div className="btndiv">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              variant={activeButton === "Bar" ? "contained" : "outlined"}
              onClick={() => handleType("Bar")}
            >
              Bar
            </Button>
            <Button
              variant={activeButton === "Doughnut" ? "contained" : "outlined"}
              onClick={() => handleType("Doughnut")}
            >
              Doughnut
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

ShowGraph.propTypes = {
  responses: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.array,
};

ShowGraph.defaultProps = {
  options: [],
  index: 0,
  type: "text",
  responses: [],
};

export default ShowGraph;
