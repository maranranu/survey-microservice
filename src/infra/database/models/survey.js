'use strict';
module.exports = (sequelize, DataTypes) => {
  var survey = sequelize.define('survey', {
    question: DataTypes.STRING,
    option: DataTypes.BOOLEAN,
    userId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return survey;
};