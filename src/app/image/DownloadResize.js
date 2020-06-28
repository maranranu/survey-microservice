const Operation = require('src/app/Operation');


class ImageController extends Operation {
  constructor({ imageRepository, config, logger }) {
    super();
    this.logger = logger;
    this.config = config;
    this.imageRepository = imageRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const filePath = this.config.imageFilePath;
      await this.imageRepository.imageProcessing(data, filePath);
      this.emit(SUCCESS, {success: true, message: 'Image downloaded and resize'});
    } catch(error) {
      this.logger.error(error);
      this.emit(ERROR, error);
    }
  }
}

ImageController.setOutputs(['SUCCESS', 'ERROR']);

module.exports = ImageController;
