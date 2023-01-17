let array_empty = false;

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
    
  }
  else {
      array_empty = true;
  }
}


function show_wishlist() {
  let wishlist_node = document.getElementById("wishlist_node");

  if (array_empty) {
    let wishlist_item = document.createElement("div");
    wishlist_item.innerHTML = `<div class="dropdown-item">
        <p>No has agregado ningún juego a tu lista de deseados!</p>
      </div>`;
    wishlist_node.append(wishlist_item);
  } else {
    let array_restore = localStorage.getItem("array_local");
    array_restore = JSON.parse(array_restore);

    array_restore.forEach((element) => {
      let wishlist_item = document.createElement("div");
      wishlist_item.innerHTML = `<div class="dropdown-item">
      <p>Juego: ${element.Nombre} - Precio: ${element.Precio}<button class="button is-small is-danger is-outlined borrar">
      <span>Borrar</span>
    </button>
    </p>
    </div>
    <hr class="dropdown-divider" />`;
      wishlist_node.append(wishlist_item);

      
    });
  }
}




let input_cart = document.getElementById("input_wishlist");
input_cart.addEventListener("click", show_wishlist);

window.addEventListener("load", data_restore);
window.addEventListener("click", data_restore);