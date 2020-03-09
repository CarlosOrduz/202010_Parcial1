let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};


socketApi.io = io;

let participantes = [
  
];

io.on("connection", function(socket) {
  io.sockets.emit("participantes", participantes);

  socket.on("new-participant", data => {
     
    socketApi.sendNotification(data);
  });
  socket.on("new-offer", () => {
     
    socketApi.updateOffer();
  });
});

socketApi.sendNotification = data => {


    participantes.push(data);
    console.log(participantes)
    
    

};
socketApi.updateOffer = () => {
    if(participantes.length==1){
        participantes[participantes.length-1].oferta.valor=150000000;
    }else{
        participantes[participantes.length-1].oferta.valor=participantes[participantes.length-2].oferta.valor+Math.floor(Math.random() * (10000000 - 5000000 +1) ) + 5000000;
    }
var pb=(Math.random() * (0.8 - 0.3) ) + 0.3;
var po=(Math.random() * (0.8 - 0.3) ) + 0.3;
console.log(po)
console.log(pb)
if(po>pb){
    participantes[participantes.length-1].oferta.estado="Oferta aceptada";
}  else{
    participantes[participantes.length-1].oferta.estado="Oferta rechazada";
}
    console.log(participantes)
      io.sockets.emit("participantes", participantes);
    

};
socketApi.showMessages = () => {
  return db.collection("mensajes").find();
};

module.exports = socketApi;