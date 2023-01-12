let array_juegos = [];
let contador = 0;

function data_push() {
  /* FUNCION PUSH A JSON */
  array_juegos.push(juego);
  let array_JSON = JSON.stringify(array_juegos);

  localStorage.setItem("array_RAW", array_JSON);

  let restore_juego = localStorage.getItem("array_RAW");

  console.log(restore_juego);

  restore_juego = JSON.parse(restore_juego);

  console.log(restore_juego);

  /* FUNCION PUSH A JSON */
}

function set_datos() {
  let data_nombre = document.getElementById("input_nombre");
  let data_precio = document.getElementById("input_precio");

  console.log(data_nombre.value);
  console.log(data_precio.value);

  /* OBJETO */
  let juego = { Nombre: data_nombre.value, Precio: data_precio.value };

  let data_precio_total = parseFloat(juego.Precio) * 1.75;

  let node_check = document.getElementById("data_node");
  console.log(node_check);

  let seccion = document.getElementById("formulario");

  if (node_check == null) {
    
    let datos =
      "<div id='data_node' class='block box'><p>" +
      "El juego '" +
      juego.Nombre +
      "' de $" +
      juego.Precio +
      " con impuestos vale unos: " +
      "$" +
      data_precio_total +
      " Pesos Argentinos." +
      "<div class='control'><button class='button is-link' id='input_addcart'>Agregar a Lista de Deseados</button></div></div>";
    let info_juego = document.createElement("div");

    info_juego.innerHTML = datos;
    seccion.append(info_juego);
  }
  
  
  else if (node_check != null) {

  }
}

let input_send = document.getElementById("input_send");

input_send.addEventListener("click", set_datos);
