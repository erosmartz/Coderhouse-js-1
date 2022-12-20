
class Juego {
    /* funcion constructora de objetos */
    constructor (nombre, precio, plataforma){

        this.nombre = nombre;
        this.precio = precio;
        this.plataforma = plataforma;
    }
    /* funcion de tipo get para mostrar p.consola los datos ingresados */

    get_data(){
        console.log("-----------------");
        console.log("Datos del item:");
        console.log("Nombre: ", this.nombre);
        console.log("Precio: ", this.precio);
        console.log("Plataforma ", this.plataforma);
        console.log("-----------------");
    }

}



/* variables globales */
let pregunta = "";
let lista_productos = [];

alert("Bienvenido al sistema!");


/* ciclo de pregunta para ingreso de datos (ya que todavia no podemos usar botones por DOM) */
while (pregunta != "no"){
    
    pregunta = prompt ("Quiere ingresar un nuevo item? Escriba SI o NO.");
    pregunta = pregunta.toUpperCase();

    if (pregunta == "SI"){

        /* ingresa nombre */
        let nombre = prompt("Ingrese el nombre del juego");

        /* error check */
        while (nombre == ""){
            nombre = prompt("Error. El nombre esta vacio! Porfavor ingresar un nombre.")
        }



        /* ingresa precio */
        let precio = parseFloat(prompt("Ingrese el precio del juego"));

        /* precio <0 check */
        while (precio < 0){
            precio = parseFloat(prompt("Error. El precio es menor a cero. Ingresar un precio valido."))
        }
        while (isNaN(precio)){
            precio = parseFloat(prompt("Error. No ha ingresado un numero. Ingresar un valor numerico."))
        }

        /* empty check */
        if (precio <= 0){
            precio = "FREE"
        }   
        
        

        /* ingresa plataforma */
        let plataforma = prompt ("Ingrese la plataforma donde se encuentra el juego");

        /* error check */
        while (plataforma == ""){
            plataforma = prompt("Error. El nombre de la plataforma esta vacio! Porfavor ingresar un nombre.")
        }




        /* se pushea el nuevo obj adentro del array */
        lista_productos.push(new Juego(nombre, precio, plataforma));
        let info_output = "El Item '" + nombre + "' ha sido ingresado correctamente. Chequear la consola para mas detalles";
        
        /* se muestra q se cargo el juego correctamente */
        alert (info_output);
    }



    else if (pregunta == "NO" ){
        alert("Usted ha salido del sistema de carga de items.");
        break;
    }

    /* condicional para chequear ingreso de prompt  */
    else{
        alert("Respuesta invalida! Porfavor ingrese SI o NO.");
    }
}







/* render de items */

for (let producto of lista_productos){
    producto.get_data();
}



/* filters */

/* filtro de ordenado por precio */

function filter_order ( a , b){
    return a - b
}


/* filtro de juegos gratis */
function filter_free(juego){
    return juego.precio == "FREE"
}


/* filtro para fecha de ofertas */
function filter_hotsale(juego){
    let descuento = juego.precio * 0.25;

    return {
        nombre:juego.nombre,
        precio:juego.precio - descuento,
        plataforma:juego.plataforma
    }
}
/* nuevo array mapeado con el filtro de ofertas */
let filter_lista_hotsale = lista_productos.map (filter_hotsale);




/* se imprime el array en la consola */
console.log(lista_productos.sort(filter_order));


/* se imprime la lista de juegos gratis */
console.log ("A continuacion se muestran los juegos que son gratis en este momento:");
console.log (lista_productos.filter(filter_free));


/* se imprime la lista hotsale */
console.log("A continuacion se muestra la lista de productos en fecha de ofertas, con un descuento del 25% en cada juego!");
console.log(filter_lista_hotsale);