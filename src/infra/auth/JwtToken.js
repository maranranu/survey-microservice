const jwt = require('jsonwebtoken');

class JwtToken {
  constructor({ config }){
    this.config = config;
  }

  createToken(data) {
    const token = jwt.sign(data, this.config.secret, { algorithm: 'HS256', expiresIn: this.config.expiresIn });
    return token;
  }

  verifyToken(jwtToken) {
    return jwt.verify(jwtToken, this.config.secret);
  }

};

module.exports = JwtToken;
