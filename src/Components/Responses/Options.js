import PropTypes from "prop-types";

function Options({ page, responses, index }) {
  return (
    <div>
      {responses[page - 1]?.answers[index].options.map((option, index) => (
        <div key={index}>
          <p>{option}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

Options.propTypes = {
  page: PropTypes.number.isRequired,
  responses: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

Options.defaultProps = {
  page: 1,
  index: 1,
  responses: [],
};

export default Options;
