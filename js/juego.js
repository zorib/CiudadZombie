
var Juego = {
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  ganador: false,
  obstaculosCarretera: [
    new Obstaculo('imagenes/valla_horizontal.png', 90, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 80, 50, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 500, 480, 40, 40, 1),
    new Obstaculo('imagenes/valla_vertical.png', 400, 480, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 420, 80, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 840, 120, 15, 30, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 80, 180, 15, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 790, 480, 30, 30, 1)
  ],

  bordes: [
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),

    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],

  enemigos: [
    new ZombieCaminante("imagenes/zombie1.png", 5, 36, 10, 10, 2,{desdeX: 3, hastaX: 500, desdeY: 3, hastaY: 800}),
    new ZombieCaminante('imagenes/zombie2.png', 35, 270, 10, 10, 2,{desdeX: 3, hastaX: 670, desdeY: 4, hastaY: 700}),
    new ZombieCaminante('imagenes/zombie3.png', 500, 500, 10, 10, 2,{desdeX: 70, hastaX: 500, desdeY: 20, hastaY: 600}),
    new ZombieCaminante("imagenes/zombie4.png", 200, 6, 10, 10, 2,{desdeX: 20, hastaX: 500, desdeY: 20, hastaY: 700}),
    new ZombieCaminante('imagenes/zombie2.png', 600, 800, 10, 10, 2,{desdeX: 300, hastaX: 800, desdeY: 300, hastaY: 500}),
    new ZombieCaminante('imagenes/zombie3.png', 600, 50, 10, 10, 2,{desdeX: 10, hastaX: 700, desdeY: 20, hastaY: 600}),

    new ZombieConductor("imagenes/tren_vertical.png",644, 400, 30, 90, 3,{desdeX:0, hastaX: 600, desdeY: 30, hastaY: 600}, "vertical"),
    new ZombieConductor("imagenes/tren_horizontal.png",400, 322, 90, 30, 2,{desdeX: 0, hastaX: 800, desdeY: 0, hastaY: 800}, "horizontal"),
    new ZombieConductor("imagenes/tren_vertical.png",678, 0, 30, 90, 1,{desdeX: 0, hastaX: 600, desdeY: 0, hastaY: 600}, "vertical")
  ]
}

Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  this.update();
  this.dibujar();
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
}

Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }

  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    this.jugador.mover(movX, movY);
    Jugador.mover = function(x,y){
      if(x>0){
         this.sprite = "imagenes/auto_rojo_derecha.png";
         this.ancho = 30;
         this.alto = 15;
       } else if(x<0) {
         this.sprite = "imagenes/auto_rojo_izquierda.png";
         this.ancho = 30;
         this.alto = 15;
       } else if(y>0){
         this.sprite = "imagenes/auto_rojo_abajo.png";
         this.ancho = 15;
         this.alto = 30;
       } else if(y<0){
         this.sprite = "imagenes/auto_rojo_arriba.png";
         this.ancho = 15;
         this.alto = 30;
      }
      this.x += x;
      this.y += y;
    };
    }
  }

Juego.dibujar = function() {
  Dibujante.borrarAreaDeJuego();
  this.dibujarFondo();
  if(this.terminoJuego() || this.ganoJuego()) return;

  Dibujante.dibujarEntidad(this.jugador);

  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });

  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);
  });

  Dibujante.dibujarRectangulo('pink', 757, 540, 130, 17);

  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }
};

Juego.moverEnemigos = function() {
  this.enemigos.forEach(function(enemigo){
    enemigo.mover();
  });
};

Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      enemigo.comenzarAtaque(this.jugador);
    } else {
    enemigo.dejarDeAtacar();
    }
  }, this);
};

Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      obstaculo.chocar(this.jugador);
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {

  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }

  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
