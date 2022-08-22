export function validateSurveyQuestions(surQuestions) {
  const titles = [];
  const option = [];
  surQuestions.forEach((question) => {
    titles.push(question.title);
    option.push(question.options[0]);
  });
  const titleResult = titles.every((ti) => ti.length > 0);
  const optionResult = option.every((ti) => ti.length > 0);
  return [titleResult, optionResult];
}
