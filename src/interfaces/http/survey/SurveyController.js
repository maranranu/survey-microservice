const { Router } = require('express');
const { inject, makeClassInvoker } = require('awilix-express');
const Status = require('http-status');
const Authenticate = require('src/app/auth/Authenticate');

const SurveyController = {
  get router() {
    const router = Router();

    router.use(inject('surveySerializer'));

    router.get('/', inject('getAllSurvey'), makeClassInvoker(Authenticate)('auth'), this.getAll);
    router.post('/', inject('createSurvey'), makeClassInvoker(Authenticate)('auth'),  this.create);

    return router;
  },

  getAll(req, res, next) {
    const { getAllSurvey, surveySerializer } = req;
    const { SUCCESS, NOT_FOUND, ERROR } = getAllSurvey.outputs;

    getAllSurvey
      .on(SUCCESS, (survey) => {
        res
          .status(Status.OK)
          .json(survey.map(surveySerializer.serialize));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getAllSurvey.execute(req.user.username);
  },

  create(req, res, next) {
    const { createSurvey, surveySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createSurvey.outputs;

    createSurvey
      .on(SUCCESS, (survey) => {
        res
          .status(Status.CREATED)
          .json(surveySerializer.serialize(survey));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createSurvey.execute(req.body, req.user.username);
  },
};

module.exports = SurveyController;
