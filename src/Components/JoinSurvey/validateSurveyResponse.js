// function to validate the survey response

export function validateSurveyResponse(surveyResponse, questions) {
  if (surveyResponse.length !== questions.length) {
    return false;
  }
  for (let i = 0; i < surveyResponse.length; i++) {
    if (
      surveyResponse[i] === undefined ||
      surveyResponse[i].options.length === 0 ||
      surveyResponse[i].options[0] === ""
    ) {
      return false;
    }
  }
  return true;
}
