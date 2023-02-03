/* seteando un par de variables globales */
let array_temp = [];
let juego_global;


/* Push objetos al array + conversion a JSON */
function data_push() {
  
  array_temp.push(juego_global);
  let array_JSON = JSON.stringify(array_temp);

  localStorage.setItem("array_local", array_JSON);

}


/* Se toman los datos introducidos (nombre+precio) y se calcula el valor del juego. 
Luego se pregunta si se quiere agregar a lista de deseados */
function set_datos() {

  /* VALORES TOMADOS */
  let data_nombre = document.getElementById("input_nombre");
  let data_precio = document.getElementById("input_precio");

  /* OBJETO JUEGO */
  let juego = { Nombre: data_nombre.value, Precio: data_precio.value };

  /* node_check se usa para saber si ya existe el node */
  let node_check = document.getElementById("data_node");

  /* el nodo que se va a usar para attachear el nuevo nodo en el DOM */
  let seccion = document.getElementById("formulario");



  /* condicional que chequea si ya existe el nodo. 
  ----Si existe > se edita el innerHTML. 
  ----De lo contrario, se crea el nuevo nodo por primera vez. */
  if (node_check) {

    let info_juego = document.getElementById("data_node");

    /* el contenido del nodo */
    info_juego.innerHTML = `<p>El juego "${juego.Nombre}" de $${juego.Precio}, 
    con todos los impuestos sale $${juego.Precio * 1.75}.</p>
    <div class="control"><button class="button is-link" id="input_addcart">Agregar a Deseados</button></div>`;
    
    /* el event Listener del boton se va a utilizar para agregar a la lista de desaedos */
    let input_add = document.getElementById("input_addcart");
    input_add.addEventListener("click",data_push);

  } else {

    let info_juego = document.createElement("div");

    /* el contenido del nodo */
    info_juego.innerHTML = `<div id="data_node" class="box"><p>El juego "${juego.Nombre}" 
    de $${juego.Precio}, con todos los impuestos sale $${juego.Precio * 1.75}.</p>
    <div class="control"><button class="button is-link" id="input_addcart">Agregar a Deseados</button></div></div>`;

    seccion.append(info_juego);

    /* el event Listener del boton se va a utilizar para agregar a la lista de desaedos */
    let input_add = document.getElementById("input_addcart");
    input_add.addEventListener("click",data_push);
  }
  juego_global = juego;
}

/* el event listener del boton para enviar los datos del juego */
let input_send = document.getElementById("input_send");
input_send.addEventListener("click", set_datos);




