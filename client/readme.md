# Reconhecimento facial

## Requisitos

* Node 6.11.4
* OpenCV 3.4.1

## Iniciando o projeto

```bash
$ node webserver.js
```

## Iniciando o projeto com Docker

```bash
$ docker pull mayconvm/opencv-3.4.1
$ docker run --rm -v `pwd`:/faculdade mayconvm/opencv-3.4.1 node /faculdade/webserver.js
```

* No browser acesso o link http://localhost:3000