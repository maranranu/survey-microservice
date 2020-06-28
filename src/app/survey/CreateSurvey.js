const Operation = require('src/app/Operation');
const Survey = require('src/domain/survey/Survey');

class CreateSurvey extends Operation {
  constructor({ surveyRepository }) {
    super();
    this.surveyRepository = surveyRepository;
  }

  async execute(data, userId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    data["userId"] = userId;
    const survey = new Survey(data);

    try {
      const newSurvey = await this.surveyRepository.add(survey);
      this.emit(SUCCESS, newSurvey);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateSurvey.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateSurvey;
