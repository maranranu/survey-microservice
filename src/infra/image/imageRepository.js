const fs = require('fs');
const request = require('request-promise');
const sharp = require('sharp');
const path = require('path');

class ImageRepository {
  constructor({ logger }) {
    this.logger = logger;
  }

 download(url, filename) {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filename);
      request(url)
      .pipe(stream)
      .on('close', () => {
        this.logger.info(`Image downloaded to ${filename}`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      })
    })
  }

  resize(input, filePath, params) {
    return new Promise((resolve, reject) => {
      params.width = params.width ? params.width : 50;
      params.height = params.height ? params.height : 50;

      const outFile = path.resolve(filePath, 'image-resize.png');
      this.logger.info('output file: ', outFile);

      let outputStream = fs.createWriteStream(outFile, {flag: 'w'});
      let transform = sharp().resize({ width: params.width, height: params.height })
                      .on('info', () => {
                        this.logger.info("Resizing done");
                      });

      this.logger.info('Transforming image');
      return fs.createReadStream(input)
      .pipe(transform)
      .pipe(outputStream)
      .on('close', () => {
        this.logger.info(`Image ${input} saved`);
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      })
    })
  }

  async imageProcessing(params, filePath) {
    try {
      const filename = path.resolve(filePath, 'image.png');
      await this.download(params.url, filename);
      return await this.resize(filename, filePath, params);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImageRepository;
