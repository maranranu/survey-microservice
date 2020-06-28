const { expect } = require('chai');
const factory = require('test/support/factory');
const SequelizeSurveyRepository = require('src/infra/survey/SequelizeSurveyRepository');
const Survey = require('src/domain/survey/Survey');
const { survey: SurveyModel } = require('src/infra/database/models');

describe('Infra :: Survey :: SequelizeSurveyRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new SequelizeSurveyRepository({ SurveyModel });
  });

  describe('#getAll', () => {
    beforeEach(() => {
      return factory.createMany('survey', 2, [
        { question: 'Survey 1', option: false, userId: 'user1' },
        { question: 'Survey 2', option: true, userId: 'user2' }
      ]);
    });

    it('returns all survey from the database', async () => {
      const sur = await repository.getAll();
      expect(sur).to.have.lengthOf(2);

      expect(sur[0]).to.be.instanceOf(Survey);
      expect(sur[0].question).to.equal('Survey 1');
      expect(sur[0].option).to.equal(false);
      expect(sur[0].userId).to.equal('user1');

      expect(sur[1]).to.be.instanceOf(Survey);
      expect(sur[1].question).to.equal('Survey 2');
      expect(sur[1].option).to.equal(true);
      expect(sur[1].userId).to.equal('user2');
    });
  });

  describe('#add', () => {
    context('when survey is valid', () => {
      it('persists the survey', () => {
        const sur = new Survey({
          question: 'The Survey',
          option: false,
          userId: 'user'
        });

        expect(sur.validate().valid).to.be.ok();

        return expect(async () => {
          const persistedSurvey = await repository.add(sur);

          expect(persistedSurvey.id).to.exist;
          expect(persistedSurvey.question).to.equal('The Survey');
          expect(persistedSurvey.option).to.equal(false);
          expect(persistedSurvey.userId).to.equal('user');
        }).to.alter(() => repository.count(), { by: 1 });
      });
    });

    context('when survey is invalid', () => {
      it('does not persist the survey and rejects with an error', () => {
        const sur = new Survey();

        expect(sur.validate().valid).to.not.be.ok();

        return expect(async () => {
          try {
            await repository.add(sur);
          } catch(error) {
            expect(error.message).to.equal('ValidationError');
            expect(error.details).to.eql([
              { message: '"question" is required', path: 'question' },
              { message: '"option" is required', path: 'option' },
              { message: '"userId" is required', path: 'userId' }
            ]);
          }
        }).to.not.alter(() => repository.count());
      });
    });
  });
});
