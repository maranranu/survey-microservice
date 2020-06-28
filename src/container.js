const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateSurvey,
  GetAllSurvey
} = require('./app/survey');

const {
  Authenticate,
  LoginAuthenticate
} = require('./app/auth');

const DownloadResize = require('./app/image/DownloadResize');

const JwtToken = require('./infra/auth/JwtToken');
const ImageRepository = require('./infra/image/imageRepository');

const SurveySerializer = require('./interfaces/http/survey/SurveySerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeSurveyRepository = require('./infra/survey/SequelizeSurveyRepository');
const { database, survey: SurveyModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  surveyRepository: asClass(SequelizeSurveyRepository).singleton(),
  JwtToken: asClass(JwtToken).singleton(),
  imageRepository: asClass(ImageRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  SurveyModel: asValue(SurveyModel)
});

// Operations
container.register({
  createSurvey: asClass(CreateSurvey),
  getAllSurvey: asClass(GetAllSurvey),
  Authenticate: asClass(Authenticate),
  LoginAuthenticate: asClass(LoginAuthenticate),
  DownloadResize: asClass(DownloadResize)
});

// Serializers
container.register({
  surveySerializer: asValue(SurveySerializer)
});

module.exports = container;
