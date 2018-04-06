const cv = require('opencv');
const mqtt = require('mqtt');
const clientMqtt = mqtt.connect('mqtt://192.168.15.6:1883');

// assim que conectar no serviço, será registrado os canais
// que serão escultados
clientMqtt.on('connect', function (err) {

  console.log("connect--->", arguments);

  clientMqtt.subscribe('/ledsON');
  clientMqtt.subscribe('/ledsOFF');
})
 
clientMqtt.on('message', function (topic, message) {

  console.log(topic + "---->>", message);
});

// // face detection properties
const rectColor = [0, 255, 0];
const rectThickness = 2;

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

        // MQTT
        clientMqtt.publish('/ledsON', 'Hello mqtt');
      });
    });

  };
};