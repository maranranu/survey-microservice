const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const ImageController = {
  get router() {
    const router = Router();

    router.get('/', inject('DownloadResize'), this.image);

    return router;
  },

  image(req, res, next) {
    const { DownloadResize } = req;
    const { SUCCESS, ERROR } = DownloadResize.outputs;

    DownloadResize
      .on(SUCCESS, (resp) => {
        res
          .status(Status.OK)
          .json(resp);
      })
      .on(ERROR, next);

    DownloadResize.execute(req.query);
  }
};

module.exports = ImageController;
