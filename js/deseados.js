/* ============================================= */
/*    FUNCIONES QUE ACTUALIZAN EL LOCAL STORAGE  */
/* ============================================= */


/* se chequea el localStorage para ver si existe la key "array_local". */
function get_array() {
  let a = localStorage.getItem("array_local")
  if (a){
    a = JSON.parse(a)
    return a
  }
}


/* se llama a esta funcion para setear el array nuevo una vez que se hacen cambios como borrar objetos de ese array */
function set_array(array) {
  let a = JSON.stringify(array);
  localStorage.setItem("array_local", a);
}








/* ============================================= */
/*     FUNCIONES PARA LA LISTA DE DESEADOS.      */
/* ============================================= */



/* Funcion: actualizar el count de items de la lista de deseados */
function wishlist_count() {
 
  /* usando el metodo length se cambia el nodo  */
  if (get_array() != null) {
    if (get_array().length > 0){
    document.getElementById("wish_number").innerText = `Deseados(${get_array().length})`;
    }
  }
}




/* Funcion: Actualizar el nodo principal de la lista de deseados.
   Utiliza las funciones wishlist_count get_array y wishlist_loop */
function wishlist_update() {

  /* variable que almacena el nodo principal donde van a estar los sub-nodos/items deseados */
  let wishlist = document.getElementById("wishlist");

    /* Si el array no existe --> */
    if (get_array() == null || get_array().length < 1) {
        wishlist.innerHTML = `<div class="dropdown-item"><p>
        No has agregado ningún juego a tu lista de deseados!
        </p></div>`
      }

    /* Si el array existe --> */
    else {
      /* Guardamos el array parseado en una variable */
      let lista_juegos = get_array()
      /* Cambiamos el innerHTML del nodo principal con la string creada a partir de la funcion wishlist_loop */
      wishlist.innerHTML = wishlist_loop(lista_juegos);
      };
}



/* Funcion: Recorrer el array y concadenar cada item del array en un string.
   Pide como parametro un array. 
   Retorna un string para ser utilizado como nodo (hecho por subnodos) */
function wishlist_loop(array) {

  let nodos = ''; /* se setea la variable principal */

  /* se recorre el array y se guardan todos los nodos en formato de string */
  for (let i = 0; i < array.length; i++) {
    nodos += `<div class="dropdown-item">
    <p">Juego: ${array[i].Nombre} - Precio: ${array[i].Precio}
    </p>
    <button class="button is-small is-danger is-outlined" onClick='removerItem(${i})'>
    <span>Borrar</span>
    </button>
    </div>
    <hr class="dropdown-divider" />`;
  }

  return nodos;
}



/* Funcion: Los botones "borrar" de la lista de deseados. */
function removerItem(index){ 

  let lista = get_array(); /* Guardamos el array parseado en una variable */
  
  lista.splice(index, 1); /* Spliceamos el item deseado, usando como referencia el index guardado como parametro en el nodo */
  
  set_array(lista); /* Updateamos el array que esta guardado en el localStorage, con el nuevo array spliceado */
  
  wishlist_update(); /* Corremos de vuelta la funcion que refresca los valores del nodo wishlist del DOM */
}




/* los varios eventListeners que se usan en este script */




    let input_cart = document.getElementById("input_wishlist");
    input_cart.addEventListener("mouseover", wishlist_update);

    /*para cuando se carga la pagina */
    window.addEventListener("load", wishlist_update);
