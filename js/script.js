let array_juegos = [];
let contador = 0;
let juego_global;

function data_push() {
  /* FUNCION PUSH A JSON */
  array_juegos.push(juego_global);
  let array_JSON = JSON.stringify(array_juegos);

  localStorage.setItem("array_RAW", array_JSON);

  let restore_juego = localStorage.getItem("array_RAW");


  restore_juego = JSON.parse(restore_juego);

  console.log(restore_juego);

  /* FUNCION PUSH A JSON */
}

function set_datos() {
  let data_nombre = document.getElementById("input_nombre");
  let data_precio = document.getElementById("input_precio");

  /* OBJETO */
  let juego = { Nombre: data_nombre.value, Precio: data_precio.value };

  let node_check = document.getElementById("data_node");

  let seccion = document.getElementById("formulario");

  if (node_check) {
    let info_juego = document.getElementById("data_node");
    info_juego.innerHTML = `<p>El juego "${juego.Nombre}" 
    de $${juego.Precio}, 
    con todos los impuestos sale $${juego.Precio * 1.75}.
    <div class="control"><button class="button is-link" id="input_addcart">Agregar a Deseados</button></div>`;

  } else {

    let info_juego = document.createElement("div");

    info_juego.innerHTML = `<div id="data_node" class="box"><p>El juego "${juego.Nombre}" 
    de $${juego.Precio}, con todos los impuestos sale $${juego.Precio * 1.75}.
    <div class="control"><button class="button is-link" id="input_addcart">Agregar a Deseados</button></div></div>`;

    seccion.append(info_juego);
    let input_add = document.getElementById("input_addcart");
    input_add.addEventListener("click",data_push);
  }
  juego_global = juego;
}


let input_send = document.getElementById("input_send");
input_send.addEventListener("click", set_datos);




