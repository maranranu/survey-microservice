const Operation = require('src/app/Operation');
const Status = require('http-status');

class Authenticate extends Operation {
  constructor({ JwtToken }){
    super();
    this.jwtToken = JwtToken;
  }

  auth (req, res, next) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    this
      .on(SUCCESS, (data)=>{
        req.user = data;
        next();
      })
      .on(ERROR, (error)=>{
        res.status(error.statusCode).json({
          type: Status[error.statusCode],
          message: error.message
        });
      })
      .on(UNAUTHORIZED, ()=>{
        res.status(Status.UNAUTHORIZED).json({
          type: Status[Status.UNAUTHORIZED],
          message: 'Unauthorized',
          loginUrl: process.env.TEMP_AUTH_URL
        });
      });

    this.execute(req.headers);
  }

  execute(headers) {
    const { UNAUTHORIZED, SUCCESS } = this.outputs;
    if (!headers.authorization) {
      this.emit(UNAUTHORIZED);
    } else {
      try {
        const token = this.jwtToken.verifyToken(headers.authorization);
        this.emit(SUCCESS, token);
      } catch (error) {
        this.emit(UNAUTHORIZED);
      }
    }
  }
}

Authenticate.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = Authenticate;
