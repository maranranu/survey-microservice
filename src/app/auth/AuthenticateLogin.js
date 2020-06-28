const Operation = require('src/app/Operation');
const Status = require('http-status');

class UserLogin extends Operation {
  constructor({ JwtToken }){
    super();
    this.jwtToken = JwtToken;
  }

  async execute(data) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const token = this.jwtToken.createToken(data);
      this.emit(SUCCESS, {...data, token: token});
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

UserLogin.setOutputs(['SUCCESS', 'ERROR']);

module.exports = UserLogin;
