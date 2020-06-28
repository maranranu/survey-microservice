const SurveyMapper = require('./SequelizeSurveyMapper');

class SequelizeSurveyRepository {
  constructor({ SurveyModel }) {
    this.SurveyModel = SurveyModel;
  }

  async getAll(...args) {
    const survey = await this.SurveyModel.findAll(...args);
    return survey.map(SurveyMapper.toEntity);
  }


  async add(survey) {
    const { valid, errors } = survey.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }
    const newSurvey = await this.SurveyModel.create(SurveyMapper.toDatabase(survey));
    return SurveyMapper.toEntity(newSurvey);
  }


  async count() {
    return await this.SurveyModel.count();
  }

}

module.exports = SequelizeSurveyRepository;
