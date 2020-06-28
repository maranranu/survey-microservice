const { expect } = require('chai');
const Survey = require('src/domain/survey/Survey');

describe('Domain :: Survey', () => {
  describe('#isValid', () => {
    context('when Survey option is invalid', () => {
      it('returns false', () => {
        const survey = new Survey({ option: null });

        expect(survey.isValid()).to.be.false();
      });
    });

    context('when option is valid', () => {
      it('returns true', () => {
        const survey = new Survey({ option: true });
        expect(survey.isValid()).to.be.true();
      });
    });
  });
});
