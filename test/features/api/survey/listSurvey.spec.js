const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/survey', () => {
  context('when request is unauthorized', () => {
    it('returns 401', async () => {
      const { body } = await request()
        .get('/api/survey')
        .send({
          message: 'Unauthorized'
        })
        .expect(401);
    });
  });
  context('when there are survey', () => {
    beforeEach(() => {
      return factory.createMany('survey', 2, [
        { question: 'First', option: false },
        { question: 'Second', option: true }
      ]);
    });

    it('return success with array of survey', async () => {
      const { body } = await request()
        .get('/api/survey')
        .expect(200);

      expect(body).to.have.lengthOf(2);

      expect(body[0].name).to.equal('First');
      expect(body[0]).to.have.all.keys('id', 'question', 'option');

      expect(body[1].name).to.equal('Second');
      expect(body[1]).to.have.all.keys('id', 'question', 'option');
    });
  });

  context('when there are no survey', () => {
    it('return success with empty array', async () => {
      const { body } = await request()
        .get('/api/survey')
        .expect(200);

      expect(body).to.have.lengthOf(0);
    });
  });
});
