const SurveySerializer = {
  serialize({ id, question, option, userId }) {
    return {
      id,
      question,
      option,
      userId
    };
  }
};

module.exports = SurveySerializer;
