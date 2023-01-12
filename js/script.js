

let array_juegos = [];

function set_datos(){

    let data_nombre = document.getElementById("input_nombre");
    let data_precio = document.getElementById("input_precio");

    console.log(data_nombre.value);
    console.log(data_precio.value);

    let juego = {Nombre:data_nombre.value , Precio:data_precio.value};
    
    array_juegos.push( juego );
    let array_JSON = JSON.stringify(array_juegos);

    localStorage.setItem("array_RAW" , array_JSON);


    let restore_juego = localStorage.getItem("array_RAW");

    console.log(restore_juego);  

    restore_juego = JSON.parse( restore_juego);

    console.log(restore_juego);



}

function pop_up() {
    let data_nombre = document.getElementById("input_nombre");
    let data_precio = document.getElementById("input_precio");

    let data_precio_masiva = parseFloat(data_precio.value) * 1.75;

    let seccion = document.getElementById("formulario");
    let datos = "<div class='block'><article class='message'><div class='message-header'><p>" + "El juego '" + data_nombre.value + "' de $" + data_precio.value + " con impuestos vale unos: " + "</p></div><div class='message-body'>" + "$" + data_precio_masiva + " Pesos Argentinos." + "</div></article></div>";
    let info_juego = document.createElement("div");
    info_juego.innerHTML = datos;
    seccion.append(info_juego);
}


let input_send = document.getElementById("input_send");

input_send.addEventListener("click",set_datos);
input_send.addEventListener("click",pop_up);
