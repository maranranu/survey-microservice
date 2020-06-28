const { expect } = require('chai');
const Survey = require('src/domain/survey/Survey');
const SequelizeSurveyMapper = require('src/infra/survey/SequelizeSurveyMapper');

describe('Infra :: Survey :: SequelizeSurveyMapper', () => {
  describe('.toEntity', () => {
    it('returns Survey instance with passed attributes', () => {
      const mockedSequelizeSurvey = {
        dataValues: {
          id: 1,
          question: 'Question 1',
          option: true,
          userId: 'kamnee'
        }
      };

      const entity = SequelizeSurveyMapper.toEntity(mockedSequelizeSurvey);

      expect(entity).to.be.instanceOf(Survey);
      expect(entity.id).to.equal(1);
      expect(entity.question).to.equal('Question 1');
      expect(entity.option).to.equal(true);
      expect(entity.userId).to.equal('kamnee');
    });
  });

  describe('.toDatabase', () => {
    it('returns survey object prepared to be persisted', () => {
      const survey = new Survey({
        question: 'Some Survey',
        option: true,
        userId: 'kamnee'
      });

      const dbSurvey = SequelizeSurveyMapper.toDatabase(survey);

      expect(dbSurvey.question).to.equal('Some Survey');
      expect(dbSurvey.option).to.equal(true);
      expect(dbSurvey.userId).to.equal('kamnee');
      expect(dbSurvey).to.have.all.keys('question', 'option', 'userId');
    });
  });
});
