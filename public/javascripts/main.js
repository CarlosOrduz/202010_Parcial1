

let socket = io.connect("http://localhost:3000", { forceNew: true });

socket.on("participantes", data => {
  
    render(data);
    document.getElementById("registro").disabled= false ;
   
  });
  socket.on("ofertas", data => {
    render(data)
    document.getElementById("oferta").disabled = true;
    document.getElementById("registro").disabled= true ;
    off=true;
    setTimeout(function(){ data.forEach(e=>{
      if(e.oferta.estado==="Oferta aceptada"){
        document.getElementById("oferta").style.display = "none"; 
        
      }else{
        document.getElementById("registro").disabled=false ;
        document.getElementById("oferta").disabled=false ;
        off=false;
      }
    })  }, 30000);
    
  });
  function render(data) {
    let html = data
      .map((e, i) => {
        if(e.oferta.estado==="Oferta rechazada"){
          return `
          <div>
              <strong>${e.nombre}</strong>
              <em>[${e.oferta.estado}. ]</em>
          <div>
          `;
        }else if(e.oferta.estado==="Oferta aceptada"){
          
          
        return `
      <div>
          <strong>${e.nombre}</strong>
          <em>[${e.oferta.estado}. Valor: $${e.oferta.valor}]</em>
      <div>
      `;}
      
      })
      .join(" ");
    
    document.getElementById("ofertas").innerHTML = html;
   
    
  
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
  
    socket.emit("new-offer",document.getElementById("nit").value); 
    
    
}