const cv = require('opencv');

// camera properties
// const camWidth = 320;
// const camHeight = 240;
// const camFps = 10;
// const camInterval = 1000 / camFps;

// // face detection properties
const rectColor = [0, 255, 0];
const rectThickness = 2;

// // initialize camera
// const camera = new cv.VideoCapture(0);
// camera.setWidth(camWidth);
// camera.setHeight(camHeight);



module.exports = function (socket) {
  return function __socketRecognize(data) {

    console.log("Canal face-recognize.");

    if (!data || !('base64' in data)) {
      console.log("Base64 não enviado.");
      return;
    }

    const pngPrefix = 'data:image/png;base64,';
    const base64 = data.base64.replace(pngPrefix, '');

    const bufferImage = new Buffer(base64, 'base64')
    const im = cv.readImage(bufferImage, function __recognize(err, im) {
      if (err) {
        throw err;
      }

      // carrega o modelo treinado para encontrar os rostos de: Maycon, Jan e Gabriel
      im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
        if (err) {
          throw err;
        }

        if (!faces.length) {
          return
        }

        console.log("Rosto encontrado.");

        for (let i = 0; i < faces.length; i++) {
          face = faces[i];
          im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
        }

        socket.emit('frame', { buffer: im.toBuffer() });
      });
    });

  };
};