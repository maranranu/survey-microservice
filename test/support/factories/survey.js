const dataFaker = require('src/infra/support/dataFaker');

module.exports = (factory, { survey }) => {
  factory.define('survey', survey, {
    question: dataFaker.name(),
    option: dataFaker.name(),
    userId: dataFaker.name()
  });
};
