// import { Producto } from "./ClassProduct.js";

// const $cart = document.querySelector(".cart_root");
let arrayCarrito = JSON.parse(localStorage.getItem('carrito2')) || [];
document.querySelector(".cart_root").innerHTML += " "
//evento sumaR CANTIDAD DE A 1
const eventoSumar = (id) => {

  let producto = arrayCarrito.find((el) => el.id == id);
  let existe = arrayCarrito.findIndex(el => el.id == producto.id)
  arrayCarrito[existe].cantidad = arrayCarrito[existe].cantidad + 1
  console.log(arrayCarrito[existe]);
  // let idproducto = arrayCarrito.find((el) => el.id == id);
  // console.log(idproducto);
  // idproducto.sumarCantidad();
  localStorage.setItem("carrito2", JSON.stringify(arrayCarrito));
  arrayCarrito = JSON.parse(localStorage.getItem('carrito2')) || [];

  productsCart(arrayCarrito);


};

// evento eliminar  de lista de a uno
const eventoRestar = (id) => {
  let producto = arrayCarrito.find((el) => el.id == id);
  let existe = arrayCarrito.findIndex(el => el.id == producto.id)
  if (arrayCarrito[existe].cantidad > 1) {
    arrayCarrito[existe].cantidad = arrayCarrito[existe].cantidad - 1
    console.log(arrayCarrito[existe]);
  } else {
    alert("elimina")
    eventoEliminar(id)
  }
  // let idproducto = arrayCarrito.find((el) => el.id == id);
  // console.log(idproducto.id);
  // idproducto.restarCantidad();
  // let borrar = idproducto.cantidad;
  // console.log(borrar);
  // if (borrar == 0) {
  //   arrayCarrito.splice(idproducto, 0);
  // }
  localStorage.setItem("carrito2", JSON.stringify(arrayCarrito));
  arrayCarrito = JSON.parse(localStorage.getItem('carrito2')) || [];
  productsCart(arrayCarrito);


};
// evento eliminar total  del array 
const eventoEliminar = (id) => {
  let producto = arrayCarrito.find((el) => el.id == id);
  let existe = arrayCarrito.findIndex(el => el.id == producto.id)
  arrayCarrito.splice(existe, 1);
  localStorage.setItem("carrito2", JSON.stringify(arrayCarrito));
  arrayCarrito = JSON.parse(localStorage.getItem('carrito2')) || [];
  productsCart(arrayCarrito);

};

const productsCart = (products) => {
  document.querySelector(".cart_root").innerHTML = " "
  const $total = document.querySelector(".total");
  // const products = JSON.parse(localStorage.getItem('carrito2'));
  console.log(products);
  products.forEach((element) => {
    let { nombre, precio, img, id, categoria, cantidad } = element;
    document.querySelector(".cart_root").innerHTML += `
                        <div class="card">
                            <img src=.${img} alt="">
                            <h3>${nombre}</h3>
                            <span>$${precio}</span>
                            <span>total: ${cantidad}  unidades de ${categoria}</span>
                        <button class="btn-sumar btn btn-success" data-id=${id}>+</button>
                        <button class="btn-restar btn btn-warning" data-id=${id}>-</button>
                        <button class="btn-eliminar btn btn-danger" data-id=${id}>x</button>
                        </div>
        `;

  },
  )
  let total = arrayCarrito.reduce((counter, el) => counter + el.precio * el.cantidad, 0);
  $total.innerHTML = `<h1>$${total}</h1>`;

  let btns = document.querySelectorAll(".btn");

  for (const btn of btns) {
    btn.addEventListener("click", (evento) => {
      // console.log(evento.style);

      console.log("afuera", evento.target.matches('.btn-sumar'));
      if (evento.target.classList.contains("btn-eliminar") === true) {

        eventoEliminar(evento.target.attributes[1].value)
      }
      else if (evento.target.classList.contains("btn-sumar") == true) {

        eventoSumar(evento.target.attributes[1].value)
      }
      else if (evento.target.classList.contains("btn-restar") == true) {

        eventoRestar(evento.target.attributes[1].value)
      }
    });
  }


};

const finalizaCompra = () => {
  Swal.fire({
    title: "Estás seguro que querés comprar?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Sí",
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      window.location = "/index.html";

      localStorage.removeItem("carrito2");
    } else if (result.isDenied) {
      Swal.fire("La compra no se realizó");
    }
  });
}
const $button = document.querySelector(".btn");
$button.addEventListener("click", () => {
  finalizaCompra();
});





// document.addEventListener("DOMContentLoaded", () => {});
// for (const resultado of JSON.parse(localStorage.getItem("carrito2"))) {
//   let producto = new Producto(
//     resultado.nombre,
//     resultado.precio,
//     resultado.img,
//     resultado.id,
//     resultado.categoria,
//     resultado.cantidad
//   );
//   arrayCarrito.push(producto);

// }
productsCart(arrayCarrito);


