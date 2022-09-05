import React, { Component } from "react";
import Graphs from "./Graphs";

/**
 *
 * @param {number} value
 * @returns {Component}
 */

function ShowContent({ value }) {
  switch (value) {
    case 0:
      return <Graphs />;
    case 1:
      return <h1>Questions</h1>;
    case 2:
      return <h1>Individuals</h1>;
    default:
      return "No content";
  }
}

export default ShowContent;
