const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: process.env.PORT
  },
  expiresIn: '7d',
  secret: process.env.SECRET_TOKEN,
  imageFilePath: process.env.IMAGE_PATH,
  logging: {
    appenders: [
      { type: 'console' },
      { type: 'file', filename: logPath }
    ]
  }
};
