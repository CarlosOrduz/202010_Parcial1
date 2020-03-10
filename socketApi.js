let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

let participantes = [];

io.on("connection", function(socket) {
  io.sockets.emit("participantes", participantes);

  socket.on("new-participant", data => {
    socketApi.sendNotification(data);
  });
  socket.on("new-offer", nit => {
    socketApi.updateOffer(nit);
  });
});

socketApi.sendNotification = data => {
  participantes.push(data);
  
};
socketApi.updateOffer = nit => {

    var mayor = 0;
    var pb = Math.random() * (0.8 - 0.3) + 0.3;
    var po = Math.random() * (0.8 - 0.3) + 0.3;
    participantes.forEach(e => {
      if (e.oferta.valor > mayor) {
        mayor = e.oferta.valor;
      }
    });
    participantes.forEach(e => {
      if (e.nit === nit) {
        
        if (po > pb) {
          e.oferta.estado = "Oferta aceptada";
         
        } else {
          e.oferta.estado = "Oferta rechazada";
        }
        if(mayor==0){
          e.oferta.valor=150000000
        }else{
          e.oferta.valor =
          mayor +
          Math.floor(Math.random() * (10000000 - 5000000 + 1)) +
          5000000;
        }
      }
      
    });
  

  

  io.sockets.emit("ofertas", participantes);
};


module.exports = socketApi;
