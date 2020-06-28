const { expect } = require('chai');
const SurveySerializer = require('src/interfaces/http/survey/SurveySerializer');
const Survey = require('src/domain/survey/Survey');

describe('Interfaces :: HTTP :: Survey :: SurveySerializer', () => {
  it('returns id, question and option', () => {
    const serializedSurvey = SurveySerializer.serialize({
      id: 123,
      question: 'The Survey',
      option: true,
      userId: 'user'
    });

    expect(serializedSurvey).to.eql({
      id: 123,
      question: 'The Survey',
      option: true,
      userId: 'user'
    });
  });

  it('ignores extra attributes', () => {
    const serializedSurvey = SurveySerializer.serialize({
      id: 321,
      question: 'The Survey',
      option: false,
      userId: 'user',
      unknown: 'Hello!'
    });

    expect(serializedSurvey).to.eql({
      id: 321,
      question: 'The Survey',
      option: false,
      userId: 'user'
    });
  });

  it('is able to serialize survey entity instances', () => {
    const survey = new Survey({ id: 1, question: 'Survey :)', option: false, userId: 'user' });
    const serializedSurvey = SurveySerializer.serialize(survey);

    expect(serializedSurvey).to.eql({
      id: 1,
      question: 'Survey :)',
      option: false,
      userId: 'user'
    });
  });
});
