

function calcular(precio) {

    let total = precio * 1.75;
    return total
}



function imprimir(){
    console.log("Juego: ", juego);
    console.log("Precio base: ", precio, "ARS");
    console.log("Impuestos totales: ", precio * 0.75, "ARS");
    console.log("Precio final del juego: ", precio_final, "ARS");
    console.log("Volver a calcular otro juego");
    alert("El precio ha sido calculado correctamente, chequear la consola")
}


alert("Bienvenido a la calculadora de precios de Steam!");

let juego = "";
let precio = "";


while (juego != "SALIR"){
    
    juego = prompt ("Ingrese el nombre del juego o escriba 'SALIR'");
   
    if (juego != "SALIR" && "salir" && "Salir"){

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

    else if (juego == "SALIR"){
        alert("Usted ha salido del sistema.");
        break
    }
}