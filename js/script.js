/* =============================================      =============================================      ============================================= */
/* =============================================                  GLOBAL SCOPE                           ============================================= */ 
/* =============================================      =============================================      ============================================= */

/* -------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------- */








/* =============================================      =============================================      ============================================= */
/* =============================================                     DARK MODE                           ============================================= */ 
/* =============================================      =============================================      ============================================= */



/* al cargar el script(la pagina) */
/* -------------------------------------------------------------------------------------------- */
setTimeout(theme_update, 45);
/* -------------------------------------------------------------------------------------------- */





/* Leer key "theme" en LocalStorage, y aplicar los colores */
function theme_update() {
  let icon = document.getElementById("theme_button");
  let mode = localStorage.getItem("theme");

  if(mode == 'dark') {
    theme_apply ('dark');
    icon.innerText = '🌞';
  }
  else{
    theme_apply ('light');
    icon.innerText = '🌙';
  }

}
/* -------------------------------------------------------------------------------------------- */







/* -------------------------------------------------------------------------------------------- */
/* Funcion: Aplicar los estilos de todos los nodos determinados en los parametros */
function theme_set_styles(nodo, valor, estilo) {
  
  let nodos = document.querySelectorAll(nodo);

  /* recorre todos los nodos especificados a travez de parametros */
  for (let i = 0; i < nodos.length; i++) {

    nodos[i].style[estilo] = valor;

    }
}
/* -------------------------------------------------------------------------------------------- */






/* -------------------------------------------------------------------------------------------- */
/* Estos son todos los nodos a cambiar, usando colores 
   dependientes de un array que cambia segun la condicion de una variable */

function theme_apply (tema) {

  /* seteamos la variable del condicional */
  let colores ='';

  if(tema == 'dark')
  {
    /* Colores del tema oscuro*/
    colores = [
    /* 0 - Negro */       'Black',
    /* 1 - Gris Oscuro */ '#1e1e1e',
    /* 2 - Blanco */      'White',
    /* 3 - Naranja */     '#ea3f00',
    /* 4 - Gris Claro */  '#3c3c3c',
    /* 5 - Invertir */    'invert(100) hue-rotate(0deg) brightness(1) contrast(1)'
    ]
  }

  else if(tema == 'light')
  {
    /* Colores del tema claro */
    colores = [
    /* 0 - Blanco */      'White',
    /* 1 - Gris Claro */  '#c3cbcb',
    /* 2 - Negro */       'Black',
    /* 3 - Naranja */     '#ea3f00',
    /* 4 - Gris Claro */  '#ececec',
    /* 5 - Invertir */    'invert(0) hue-rotate(180deg) brightness(0.8) contrast(1.9)'
    ]
  }


  /* Backgrounds */
  theme_set_styles(['body','nav', 'main'], colores[1], 'backgroundColor')
  theme_set_styles(['footer','.button','#box_calc','input','.dropdown-content','.tag:nth-child(3)'], colores[0], 'backgroundColor')
  theme_set_styles('.card', colores[4], 'backgroundColor')
  theme_set_styles('.tag:first-child',colores[2],'backgroundColor')
  theme_set_styles(['.dropdown-item button','#box_calc button','.tag:nth-child(2)'],colores[3],'backgroundColor')
  
  /* Fonts */
  theme_set_styles(['p','h2','span','label','input','a','button','strong','.card p.title','.tag:nth-child(2)','#noticias .content','.tag:nth-child(3)'], colores[2], 'color')
  theme_set_styles(['h1', 'p.title:not(.is-6)'], colores[3], 'color')
  theme_set_styles('.tag:first-child',colores[0],'color')
  
  /* etc */
  theme_set_styles(['input','.dropdown-item button'], colores[3], 'borderColor')
  theme_set_styles('nav img', colores[5],'filter')
  
}
/* -------------------------------------------------------------------------------------------- */




/* -------------------------------------------------------------------------------------------- */
/* La funcion principal del modo oscuro. */
function theme_switch() {

  /* Se localiza el nodo del icono */
  let icon = document.getElementById("theme_button");
  /* Se chequea el LocalStorage en busca de la key del modo oscuro */
  let mode = localStorage.getItem("theme");

  /* Si la key se encuentra y es true */
  if (mode == 'dark'){

    /* Se cambia a modo claro, el icono y la key */
    theme_apply ('light');
    icon.innerText = '🌙';
    localStorage.setItem('theme', 'light')
  }
  else{

    /* Se cambia a modo oscuro, el icono y la key */
    theme_apply ('dark');
    icon.innerText = '🌞';
    localStorage.setItem('theme', 'dark')
  }
}
/* -------------------------------------------------------------------------------------------- */


/* =============================================      =============================================      ============================================= */
/* =============================================                  CALCULADORA                            ============================================= */ 
/* =============================================      =============================================      ============================================= */


/* -------------------------------------------------------------------------------------------- */
/* Se toman los datos introducidos (nombre+precio) y se genera un objeto con los mismos */
function get_juego () {
    /* valores de los nodos DOM para el objeto */
    let nombre = document.getElementById("nombre");
    let precio = document.getElementById("precio");
    let precio_iva = parseFloat(precio.value) * 1.75;
    
  
    /* OBJETO JUEGO */
    let juego = { Nombre: nombre.value, Precio: precio.value, Total: precio_iva };
    return juego
}
/* -------------------------------------------------------------------------------------------- */





/* -------------------------------------------------------------------------------------------- */
/* Se calcula el valor del juego. 
Luego se pregunta agregar a lista de deseados, a travez de modificacion de un nodo en el DOM */
function calcular_precio() {

  /* Tomamos el objeto obtenido anteriormente */
  let juego = get_juego ();
  

  /* el nodo del box donde se muestra el resultado + el boton de agregar a lista deseados */
  let box = document.getElementById("box_calc");
  
  /* el box es invisible hasta que tocamos el boton de "calcular" y se modifica a travez del estilo display */
  box.style.display = "block";

  /* Cambiamos el HTML interno del nodo por el correcto. Antes yo estaba creando todo el tiempo nodos nuevos. Ahora
  modifico el mismo con una logica mejorada para que no se repita y sea mas simple */
  if (juego.Nombre == ''){
    box.innerHTML = `<p>Error: Porfavor ingrese un nombre válido.</p>`
  }
  else {
    box.innerHTML = `<p>El juego "${juego.Nombre}" de $${juego.Precio}, 
    con todos los impuestos sale $${juego.Total}.</p>
    <div class="control"><button class="button is-link" onClick='data_push()'>Agregar a Deseados</button></div>`;
  }

}
/* -------------------------------------------------------------------------------------------- */






/* =============================================      =============================================      ============================================= */
/* =============================================                  LOCAL STORAGE                          ============================================= */ 
/* =============================================      =============================================      ============================================= */




/* -------------------------------------------------------------------------------------------- */
/* Se agrega un array temporal con todos los juegos agregados recientemente al localstorage.  */
function push_array() {
  
  /* una variable temporal para guardar el array mas actualizado */
  let temp = get_array()

  /* se pushea el objeto retornado por get_juego() */
  temp.push(get_juego())

  /* se pasa el array a JSON */
  /* Se guarda en el localStorage */
  set_array(temp)
  

} /* Nota: Ahora funciona bien - antes, se guardaba el array temporal en una variable global la cual solo
tenia en cuenta los objetos que se agregaban a la lista de deseados, y no los que se borraban de la misma */
/* -------------------------------------------------------------------------------------------- */





/* -------------------------------------------------------------------------------------------- */
/* 1.pushea el array de juegos recien agregados al localstorage y updatea lista deseados */ 

function data_push() {
  /* pusheamos el array al localstorage */
  push_array();

  /* updateamos la lista */
  wishlist_update();

}  /* Nota: Se podria combinar con la funcion de arriba pero creo que asi queda mas limpio  */
/* -------------------------------------------------------------------------------------------- */







/* -------------------------------------------------------------------------------------------- */
/* se chequea el localStorage para ver si existe la key "array_local". */
function get_array() {
  let a = localStorage.getItem("array_local")
  if (a){
    a = JSON.parse(a)
    return a
  }
  /* Si no existe, se retorna un array vacio para poder simplificar otras funciones
   y no tener que usar variables globales vacias */
  else {
    a = []
    return a
  }
}
/* -------------------------------------------------------------------------------------------- */







/* -------------------------------------------------------------------------------------------- */
/* Se llama a esta funcion para setear el array en el LocalStorage
   una vez que se hacen cambios como borrar o agregar objetos al array principal */
function set_array(array) {
  let a = JSON.stringify(array);
  localStorage.setItem("array_local", a);
}
/* -------------------------------------------------------------------------------------------- */








/* =============================================      =============================================      ============================================= */
/* =============================================                  LISTA DE DESEADOS                      ============================================= */ 
/* =============================================      =============================================      ============================================= */




/* -------------------------------------------------------------------------------------------- */
/* Funcion: actualizar el count de items de la lista de deseados */
function wishlist_count() {
 
  /* comprobar si el array existe -> */
  if (get_array() != null) {
    /* comprobar si el array es mayor a cero ([]) -> */
    if (get_array().length > 0){

    /* usando el metodo length se cambia el nodo  */
    document.getElementById("wish_number").innerHTML = `<strong><span>Deseados</span><span style='color:red'> (${get_array().length})</span></strong>`;
    }

    /* Si no agregaba este condicional, se quedaba en (1) al eliminar los objetos  */
    else {
      document.getElementById("wish_number").innerText = `Deseados`;
    }
  }
}
/* -------------------------------------------------------------------------------------------- */









/* -------------------------------------------------------------------------------------------- */
/* Funcion: Actualizar el nodo principal de la lista de deseados.
   Utiliza las funciones get_array, wishlist_count y wishlist_loop */
function wishlist_update() {

  /* variable que almacena el nodo principal donde van a estar los sub-nodos/items deseados */
  let wishlist = document.getElementById("wishlist");

  
    /* Condicionales ordeandos para que no tire errores como "no se puede hacer .length" --> */
    if (get_array() == null || get_array().length == [] || get_array().length < 1) {

      /* modificar el HTML interno de la wishlist, con un texto indicando que no hay juegos agregados */
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
  
    /* Finalmente, se actualiza el counter del nodo */
    wishlist_count();
}
/* -------------------------------------------------------------------------------------------- */








/* -------------------------------------------------------------------------------------------- */
/* Funcion: Recorrer el array y concatenar cada item del array en un string.
   Pide como parametro un array. 
   Retorna un string para ser utilizado como nodo (hecho por subnodos) */
function wishlist_loop(array) {

  let nodos = ''; /* se setea la variable principal */
  let total = 0; /* se setea el total */

  /* se recorre el array y se guardan todos los nodos en formato de string */
  for (let i = 0; i < array.length; i++) {
    nodos += `<div class="dropdown-item">
    <p><em>Juego:</em> <strong>${array[i].Nombre}</strong><br><em>Precio:</em> <strong>${array[i].Total}</strong></p>
    <button class="button is-small is-danger is-outlined" onClick='removerItem(${i})'>
    <span>Borrar</span>
    </button>
    </div>
    <hr class="dropdown-divider" />`;
    total += array[i].Total;
  }
  /* se le agrega un nodo al final para que tenga la suma total de todos los juegos */
  nodos += `<div class="dropdown-item">
  <p><em>Precio Total:</em> <strong>${total}</strong></p>
  </div>`
  return nodos;
}
/* -------------------------------------------------------------------------------------------- */









/* -------------------------------------------------------------------------------------------- */
/* Funcion: Los botones "borrar" de la lista de deseados. */
function removerItem(index){ 

  let lista = get_array(); /* Guardamos el array parseado en una variable */
  
  lista.splice(index, 1); /* Spliceamos el item deseado, usando como referencia el index guardado como parametro en el nodo */
  
  set_array(lista); /* Updateamos el array que esta guardado en el localStorage, con el nuevo array spliceado */
  
  wishlist_update(); /* Corremos de vuelta la funcion que refresca los valores del nodo wishlist del DOM */
}
/* Nota: esto fue uno de los mas dificiles. no funcionaba de ninguna manera. 
   tuve que usar eventos agregados a las etiquetas de HTML
  y ahi recien me empezo a dar resultados */
/* -------------------------------------------------------------------------------------------- */








/* =============================================      =============================================      ============================================= */
/* =============================================                  EVENT LISTENERS                     /* ============================================= */ 
/* =============================================      =============================================      ============================================= */


/* -------------------------------------------------------------------------------------------- */
    /*para cuando se carga la pagina */
    window.addEventListener("load", wishlist_update);
    window.addEventListener("click", theme_update);

/* nota: El resto de los event listeners estan agregados a los tags HTML directamente con OnClick
/* de esta manera, no tiran errores como en la pagina de Noticias,  */
/* cuando no podia agregar los listeners a los botones de la pagina Index */
/* -------------------------------------------------------------------------------------------- */





/* =============================================      =============================================      ============================================= */
/* =============================================                   FETCH - APIs                          ============================================= */ 
/* =============================================      =============================================      ============================================= */

    

/* -------------------------------------------------------------------------------------------- */
/* Catalogo de juegos . Fetch API*/
/* formato de los datos del json */ /* id, nombre, precio, genero, imagen, rating  */





/* -------------------------------------------------------------------------------------------- */
/* Se hace el request al API */
fetch("../js/juegos.json")
    .then(response => response.json())
    /* se ejecuta la funcion api_nodos usando como parametro el array traido del API con el Fetch */
    .then(data => {

        if(localStorage.getItem('api')) { 
          api_refresh()
        }
      else {
        
          localStorage.setItem('api',JSON.stringify(data))
          api_refresh()
        }
      })
/* -------------------------------------------------------------------------------------------- */
    



/* Se refresca el array */
/* -------------------------------------------------------------------------------------------- */
function api_refresh() {

  /* Se busca el nodo que se va a utilizar para concatenar los subnodos */
  if(document.getElementById("catalogo"))  {
    document.getElementById("catalogo").innerHTML = api_nodos(
      JSON.parse(
          localStorage.getItem('api')
          )
        )
      }
}
/* -------------------------------------------------------------------------------------------- */    





/* -------------------------------------------------------------------------------------------- */    
/* Esta funcion recorre el array del API y toma los diferentes datos de los objetos para generar nodos tipo "carta" en
la seccion de catalago del sitio web. */
function api_nodos(array){
  let nodos = ''; /* se setea la variable principal */
  let x = 0;      /* se setea el counter para el div "columns" */

  /* se recorre el array y se guardan todos los nodos en formato de string */
  for (let i = 0; i < array.length; i++) {
    x++;
    if (x == 1) {
      nodos += `<div class="columns">`
    }
    
    nodos += `<div class="column">
    <div class="card">
        <div class="card-image">
            <figure class="image is-3by4">
            <img src="${array[i].imagen}" alt="${array[i].nombre}">
            </figure>
        </div>
          <div class="card-content p-2 pt-3">
              <div class="media">
                <div class="media-content">
                    <p class="title is-6">${array[i].nombre}</p>
                </div>
              </div>
          
              <div class="content tags has-addons">
                <span class="tag is-white">$ ${array[i].precio}</span>
                <span class="tag is-info">${array[i].genero}</span>
                <span class="tag is-success">★ ${array[i].rating}</span>
              </div>
          </div>
      </div>
    </div>`;
    
    if (x == 3) {
      nodos += `</div>`
      x = 0;
    }
  }

  return nodos;
}
/* -------------------------------------------------------------------------------------------- */    




/* -------------------------------------------------------------------------------------------- */   
/* Filtros para el API key*/




/* orden alfabetico */
/* -------------------------------------------------------------------------------------------- */ 
function api_filter_name() {

  /* parsear el array y guardarlo en una variable */
  let array = JSON.parse(localStorage.getItem('api'))

  let orden = sessionStorage.getItem('order');

  if( orden == 1 || orden == null ) {
    array.sort(
      (a, b) => {

        

        sessionStorage.setItem('order', 0);
    
        const nombreA = a.nombre.toUpperCase();
        const nombreB = b.nombre.toUpperCase();
    
        if (nombreA < nombreB) { return -1}
        if (nombreA > nombreA) { return 1}
        return 0
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (A-Z)'
  }
  else {
    array.sort(
      (b, a) => {

      
        
        sessionStorage.setItem('order', 1);
    
        const nombreA = a.nombre.toUpperCase();
        const nombreB = b.nombre.toUpperCase();
    
        if (nombreA < nombreB) { return -1}
        if (nombreA > nombreA) { return 1}
        return 0
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Z-A)'
  }

  localStorage.setItem('api',JSON.stringify(array))
  api_refresh()


}
/* -------------------------------------------------------------------------------------------- */ 





/* orden precio */
/* -------------------------------------------------------------------------------------------- */ 
function api_filter_price() {

  /* parsear el array y guardarlo en una variable */
  let array = JSON.parse(localStorage.getItem('api'))

  let orden = sessionStorage.getItem('order');

  if( orden == 1 || orden == null ) {
    array.sort(
      (a, b) => {
        
        sessionStorage.setItem('order', 0);
    
        return a.precio - b.precio
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Más Barato)'
  }
  else {
    array.sort(
      (b, a) => {
        
        sessionStorage.setItem('order', 1);
    
        return a.precio - b.precio
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Más Caro)'
  }

  localStorage.setItem('api',JSON.stringify(array))
  api_refresh()


}
/* -------------------------------------------------------------------------------------------- */ 







/* orden rating */
/* -------------------------------------------------------------------------------------------- */ 
function api_filter_rating() {

  /* parsear el array y guardarlo en una variable */
  let array = JSON.parse(localStorage.getItem('api'))

  let orden = sessionStorage.getItem('order');

  if( orden == 1 || orden == null ) {
    array.sort(
      (a, b) => {
        
        sessionStorage.setItem('order', 0);
    
        return a.rating - b.rating
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Rating 0-5)'
  }
  else {
    array.sort(
      (b, a) => {
        
        sessionStorage.setItem('order', 1);
    
        return a.rating - b.rating
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Rating 5-0)'
  }

  localStorage.setItem('api',JSON.stringify(array))
  api_refresh()


}
/* -------------------------------------------------------------------------------------------- */ 







/* orden genero */
/* -------------------------------------------------------------------------------------------- */ 
function api_filter_genre() {

  /* parsear el array y guardarlo en una variable */
  let array = JSON.parse(localStorage.getItem('api'))

  let orden = sessionStorage.getItem('order');

  if( orden == 1 || orden == null ) {
    array.sort(
      (a, b) => {
        
        sessionStorage.setItem('order', 0);
    
        const nombreA = a.genero.toUpperCase();
        const nombreB = b.genero.toUpperCase();
    
        if (nombreA < nombreB) { return -1}
        if (nombreA > nombreA) { return 1}
        return 0
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Género A-Z)'
  }
  else {
    array.sort(
      (b, a) => {
        
        sessionStorage.setItem('order', 1);
    
        const nombreA = a.genero.toUpperCase();
        const nombreB = b.genero.toUpperCase();
    
        if (nombreA < nombreB) { return -1}
        if (nombreA > nombreA) { return 1}
        return 0
      }
    )

    document.getElementById('boton_filtro').innerText = 'Filtros (Género Z-A)'
  }

  localStorage.setItem('api',JSON.stringify(array))
  api_refresh()



}
/* -------------------------------------------------------------------------------------------- */ 