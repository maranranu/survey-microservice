const { expect } = require('chai');
const CreateSurvey = require('src/app/survey/CreateSurvey');

describe('App :: Survey :: CreateSurvey', () => {
  var createSurvey;

  context('when survey is valid', () => {
    before(() => {
      const MockSurveyRepository = {
        add: (survey) => Promise.resolve(survey)
      };

      createSurvey = new CreateSurvey({
        surveyRepository: MockSurveyRepository
      });
    });

    it('creates the survey and emits SUCCESS', (done) => {
      const surveyData = { question: 'New Survey', option: true, userId: 'user' };

      createSurvey.on(createSurvey.outputs.SUCCESS, (response) => {
        expect(response.question).to.equal('New Survey');
        done();
      });

      createSurvey.execute(surveyData);
    });

  });

  context('when survey is invalid', () => {
    before(() => {
      const MockSurveyRepository = {
        add: () => Promise.reject(Error('ValidationError'))
      };

      createSurvey = new CreateSurvey({
        surveyRepository: MockSurveyRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const surveyData = { question: 'New Survey', option: true, userId: 'user' };

      createSurvey.on(createSurvey.outputs.VALIDATION_ERROR, (response) => {
        expect(response.message).to.equal('ValidationError');
        done();
      });

      createSurvey.execute(surveyData);
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockSurveyRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createSurvey = new CreateSurvey({
        surveyRepository: MockSurveyRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const surveyData = { question: 'New Survey', option: true, useId: 'user' };

      createSurvey.on(createSurvey.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      createSurvey.execute(surveyData);
    });
  });
});
