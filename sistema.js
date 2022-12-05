
/* funcion que calcula el precio total del juego. Se estima un valor numerico de precio base para el parametro "precio" */
function calcular(precio) {

    let total = precio * 1.75;
    return total
}


/* Esta funcion es la que imprime los valores en la consola y en el UI. No requiere de ningun parametro */
function imprimir(){
    console.log("Juego: ", juego);
    console.log("Precio base: ", precio, "ARS");
    console.log("Impuestos totales: ", precio * 0.75, "ARS");
    console.log("Precio final del juego: ", precio_final, "ARS");
    console.log("Volver a calcular otro juego");
    let texto_output = "El juego " + "'" + juego + "'" + " sale " + precio_final + " ARS en total." + " Los impuestos son de " + precio * 0.75 + " ARS.";
    alert(texto_output);
}


/* Mensaje de Bienvenida */
alert("Bienvenido/a a la calculadora de precios de Steam!");

/* Se establecen los valores vacios asi  el while no hace loop infinito */
let juego = "";
let precio = "";


while (juego != "SALIR"){
    
    juego = prompt ("Ingrese el nombre del juego o escriba 'SALIR'");

/* si el usuario ingreso un nombre valido, se ejecuta la funcion de suma de precios */
    if (juego == "salir" || juego == "Salir"){
        juego = juego.toUpperCase()
    }

    if (juego != "SALIR"){

        precio = parseFloat(prompt("Ingrese el precio del juego en Pesos Argentinos:"));

        if (precio > 0)
        { 
            precio_final = calcular(precio);
            imprimir()
        }
        else{
            alert("Precio ingresado no válido. Porfavor intente de nuevo.")
        }
    }
/* Si el usuario ingresa "SALIR", se cierra el while */
    else if (juego == "SALIR" ){
        alert("Usted ha salido del sistema.");
        break
    }
}