let array_check = false;
function data_restore() {
  let array_restore = localStorage.getItem("array_local");
  if (typeof array_restore != "null") {
    array_check = true;
    array_restore = JSON.parse(array_restore);

    let array_length = array_restore.length;

    if (array_length > 0) {
      let wishlist_button = document.getElementById("input_wishlist");
      wishlist_button.innerHTML = `<strong>Deseados(${array_length})</strong>`;
    }
  }
}

function show_wishlist() {
  let nav_wishlist = document.getElementById("input_wishlist");

  if (array_check == false) {
    let wishlist_box = document.createElement("div");
    wishlist_box.innerHTML = `<div id="wishlist_node" class="notification">
    <button class="delete"></button><p>El carrito esta vacío</p></div>`;
    document.body.append(wishlist_box);
  } else {
    let array_restore = localStorage.getItem("array_local");
    array_restore = JSON.parse(array_restore);
    let wishlist_box = document.createElement("div");
    wishlist_box.innerHTML = `<div id="wishlist_node" class="notification">
    <button class="delete"></button></div>`;
    document.body.append(wishlist_box);

    array_restore.forEach((element) => {
      let wishlist_inner = document.createElement("div");
      wishlist_inner.innerHTML = `<div class="notification"><p>Juego: ${element.Nombre} - Precio: ${element.Precio} </p><button class="delete">Borrar</button></div>`;
      wishlist_box.append(wishlist_inner);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});

let input_cart = document.getElementById("input_wishlist");
input_cart.addEventListener("click", show_wishlist);

window.addEventListener("load", data_restore);
