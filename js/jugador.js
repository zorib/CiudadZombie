var Jugador = {

  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  mover: function(movX, movY){
    this.x += movX;
    this.y += movY;
  },
  perderVidas: function(cantidadVidas){
    this.vidas -= cantidadVidas;
  }
}
