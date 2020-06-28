const Operation = require('src/app/Operation');

class GetAllSurvey extends Operation {
  constructor({ surveyRepository }) {
    super();
    this.surveyRepository = surveyRepository;
  }

  async execute(userId) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const allSurvey = await this.surveyRepository.getAll({
        where: {
          userId: userId
        }
      });
      this.emit(SUCCESS, allSurvey);
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        this.emit(NOT_FOUND, error);
      } else {
        this.emit(ERROR, error);
      }
    }
  }
}

GetAllSurvey.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetAllSurvey;
