const request = require('test/support/request');
const { expect } = require('chai');

const authHeaders = {
  'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthbW5lZSIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNTkzMzMwODQ2LCJleHAiOjE1OTM5MzU2NDZ9.5WMua5qcazTkuLFqIiULuDEQoxMwWM8LdYJWFyZTSd4'
}

describe('API :: POST /api/survey', () => {
  context('when request is unauthorized', () => {
    it('returns 401', async () => {
      const { body } = await request()
        .post('/api/survey')
        .send({
          message: 'Unauthorized'
        })
        .expect(401);
    });
  });

  context('when sent data is ok', () => {
    it('creates and returns 201 and the new survey', async () => {
      const { body } = await request()
        .post('/api/survey')
        .set(authHeaders)
        .send({
          question: 'New Survey',
          option: false
        })
        .expect(201);

      expect(body.id).to.exist;
      expect(body.name).to.equal('New Survey');
      expect(body).to.have.all.keys('id', 'question', 'option');
    });
  });

  context('when question is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/survey')
        .set(authHeaders)
        .expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(1);
      expect(body.details[0].message).to.equal('"question" is required');
    });
  });

  context('when option is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/survey')
        .set(authHeaders)
        .expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(1);
      expect(body.details[0].message).to.equal('"option" is required');
    });
  });
});
