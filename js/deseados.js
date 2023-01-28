let array_empty = false;
let x = 0;

function data_restore() {
  let array_restore = localStorage.getItem("array_local");
  if (array_restore != null) {
    array_check = true;
    array_restore = JSON.parse(array_restore);

    let array_length = array_restore.length;

    if (array_length > 0) {
      let wishlist_button = document.getElementById("wishlist_texto");
      wishlist_button.innerText = `Deseados(${array_length})`;
    }
  } else {
    array_empty = true;
  }
}

function show_wishlist() {
  let wishlist_node = document.getElementById("wishlist_node");
  let node2_check = document.getElementById("node2_check");
  wishlist_node.innerHTML = "";
  if (array_empty) {
    if (node2_check) {
      wishlist_item.innerHTML = `<div class="dropdown-item">
        <p>No has agregado ningún juego a tu lista de deseados!</p>
      </div>`;
    } else {
      let wishlist_item = document.createElement("div");
      wishlist_item.innerHTML = `<div class="dropdown-item" id=node2_check>
        <p>No has agregado ningún juego a tu lista de deseados!</p>
      </div>`;
      wishlist_node.append(wishlist_item);
    }
  } else {
    let array_restore = localStorage.getItem("array_local");
    array_restore = JSON.parse(array_restore);


    array_restore.forEach((element) => {
      console.log(element);
      
      let wishlist_item = document.createElement("div");
      wishlist_item.innerHTML = `<div class="dropdown-item">
      <p">Juego: ${element.Nombre} - Precio: ${element.Precio}
    </p>
    <button class="button is-small is-danger is-outlined" id="node_${x}">
    <span>Borrar</span>
    </button>
    </div>
    <hr class="dropdown-divider" />`;
      
      console.log(x);
      wishlist_node.append(wishlist_item);


      let node = document.getElementById(`node_${x}`);
      node.addEventListener("click", borrar_juego);
      x ++;
      
    });
  }
}


function borrar_juego () {
  console.log("funciona")
}

let input_cart = document.getElementById("input_wishlist");
input_cart.addEventListener("click", show_wishlist);

window.addEventListener("load", data_restore);
window.addEventListener("click", data_restore);
