const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const AuthController = {
  get router() {
    const router = Router();

    router.post('/', inject('LoginAuthenticate'), this.signin);

    return router;
  },

  signin(req, res, next) {
    const { LoginAuthenticate } = req;
    const { SUCCESS, ERROR } = LoginAuthenticate.outputs;

    LoginAuthenticate
      .on(SUCCESS, (auth) => {
        res
          .status(Status.OK)
          .json(auth);
      })
      .on(ERROR, next);

    LoginAuthenticate.execute(req.body);
  }
};

module.exports = AuthController;
