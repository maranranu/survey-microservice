const Survey = require('src/domain/survey/Survey');

const SequelizeSurveyMapper = {
  toEntity({ dataValues }) {
    const { id, question, option, userId } = dataValues;

    return new Survey({ id, question, option, userId });
  },

  toDatabase(survivor) {
    const { question, option, userId } = survivor;

    return { question, option, userId };
  }
};

module.exports = SequelizeSurveyMapper;
