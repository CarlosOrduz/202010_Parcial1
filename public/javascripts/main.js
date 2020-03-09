

let socket = io.connect("http://localhost:3000", { forceNew: true });
socket.on("participantes", data => {
    //console.log(data);
    render(data);
  });
  function render(data) {
    let html = data
      .map((e, i) => {
        return `
      <div>
          <strong>${e.nombre}</strong>
          <em>[${e.oferta.estado}. Valor:${e.oferta.valor}]</em>
      <div>
      `;
      })
      .join(" ");
    console.log(html);
    document.getElementById("ofertas").innerHTML = html;
    document.getElementById("oferta").disabled = true;
    document.getElementById("form1").style.display = "initial"; 
  
  }
function register(){
      
    let participante = {
        nit: document.getElementById("nit").value,
        nombre: document.getElementById("razonsocial").value,
        oferta:{ estado: "default",
        valor: 0}
    };
    
    socket.emit("new-participant", participante);
    document.getElementById("form1").style.display = "none"; 
    document.getElementById("oferta").disabled = false;
}

function ofertar(){
    socket.emit("new-offer");  
}