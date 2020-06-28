const { expect } = require('chai');
const GetAllSurvey = require('src/app/survey/GetAllSurvey');

describe('App :: Survey :: GetAllSurvey', () => {
  var getAllSurvey;

  context('when query is successful', () => {
    before(() => {
      const MockSurveyRepository = {
        getAll: () => Promise.resolve('Imagine all the survey...')
      };

      getAllSurvey = new GetAllSurvey({
        surveyRepository: MockSurveyRepository
      });
    });

    it('emits SUCCESS with all the survey', (done) => {
      getAllSurvey.on(getAllSurvey.outputs.SUCCESS, (response) => {
        expect(response).to.equal('Imagine all the survey...');
        done();
      });

      getAllSurvey.execute();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockSurveyRepository = {
        getAll: () => Promise.reject(new Error('Failed'))
      };

      getAllSurvey = new GetAllSurvey({
        surveyRepository: MockSurveyRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      getAllSurvey.on(getAllSurvey.outputs.ERROR, (response) => {
        console.log(response.message);
        expect(response.message).to.equal('Failed');
        done();
      });

      getAllSurvey.execute();
    });
  });
});
