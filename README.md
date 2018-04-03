# Reconhecimento facial
Projeto da faculdade.

Projeto escrito em Node.js, para reconhecer um rosto em uma imagem.

## Como funciona

# Ao iniciar o webservice, será disponibilizado a url para carregar a página Web
# Ao carregar a página pela url http://localhost:3000, será pedido permissão para camera.
# Assim que for autorizado a captura da imagem da camera a conexão com socket irá iniciar
# A cada 1 segundo, 1 frame é enviado para o webservice
# O Modelo treinado para reconhecer um rosto será carregado e irá verificar a imagem
# O Webservice irá devolver a imagem com um retangulo ao redor da imagem


## Instalando o OpenCV
	https://docs.opencv.org/trunk/d2/de6/tutorial_py_setup_in_ubuntu.html
	https://www.pyimagesearch.com/2016/10/24/ubuntu-16-04-how-to-install-opencv/

sudo apt-get install -y build-essential cmake pkg-config
sudo apt-get install -y libjpeg8-dev libtiff5-dev libjasper-dev libpng12-dev
sudo apt-get install -y libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install -y libxvidcore-dev libx264-dev
sudo apt-get install -y libatlas-base-dev gfortran

wget https://github.com/opencv/opencv/archive/master.zip
mv master.zip opencv.zip
unzip opencv.zip
cd opencv-master
mkdir build
cd build
cmake ../
make
sudo make install
sudo ldconfig


## Problemas conhecidos

### Problema 1
```js
module.js:597
  return process.dlopen(module, path._makeLong(filename));
                 ^

Error: libopencv_video.so.3.4: cannot open shared object file: No such file or directory
    at Error (native)
    at Object.Module._extensions..node (module.js:597:18)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/home/maycon/projetos/Faculdade/Sistemas distribuidos/client/node_modules/opencv/lib/bindings.js:4:15)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
```
Solução: 
	Tenha certeza que a biblioteca do opencv esteja instalada na maquina.  (passos OpenCV)
```bash
	rm -rf node_modules
	npm i
	npm rebuild
```