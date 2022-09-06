import React from "react";
import Graphs from "./Graphs";
import Individuals from "./Individuals";

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
      return <Individuals />;
    default:
      return "No content";
  }
}

export default ShowContent;
