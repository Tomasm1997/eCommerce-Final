import { Producto } from "./ClassProduct.js";
const $root = document.getElementById('root')

let arrayCarrito = [];
let arrayProductos = [];
let imgcarrito=document.querySelector('#imgChange');

// funciones
// funciones
// const carga= async ()=> {
//   arrayProductos= await getRequest()
//   console.log(arrayProductos);
// }
//  carga()
export const getRequest = async () => {
    let req = await fetch("./productos.json")
    let response = await req.json()
    for (const el of response) {
        arrayProductos.push(el)
        console.log(arrayProductos)
    }
    localStorage.setItem("productsArray",JSON.stringify(arrayProductos));
    generarCards(arrayProductos);
}


export const generarCards = (array) => {
    array.forEach(element => {
        let { nombre, precio, id, img } = element;
        $root.innerHTML += `

                        <div class="card">
                            <img src=.${img} alt="">
                            <h3>${nombre}</h3>
                            <span>$${precio}</span>
                            <button class="btn-agregar btn btn-primary" data-id=${id}>Agregar al carrito</button>
                        </div>
        `
        
    });
    eventoAgregarProducto();
}

export const eventoAgregarProducto = () => {
    let btns = document.querySelectorAll(".btn-agregar")
    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
                Swal.fire({
                position: "top-end",
                icon: "success",
                title:"Agregaste un producto a tu compra!",
                showConfirmButton: false,
                timer: 900,
                });
            let id = event.target.attributes[1].value;
            console.log(id);
            let resultado = arrayProductos.find(el => el.id == id);
            console.log("🚀 ~ file: scripts.js:52 ~ btn.addEventListener ~ resultado", resultado)
            let existe = arrayCarrito.findIndex(el => el.id == resultado.id)
            console.log("🚀 ~ file: scripts.js:54 ~ btn.addEventListener ~ existe", existe)
            if (existe !== -1) {
                // let producto = arrayCarrito[existe];
                arrayCarrito[existe].cantidad=arrayCarrito[existe].cantidad+1
                console.log(arrayCarrito[existe]);
                // producto.sumarCantidad();
            } else {
                
                let producto = new Producto(
                resultado.nombre,
                resultado.precio,
                resultado.img,
                resultado.id,
                resultado.categoria,
                resultado.cantidad
                );
                // producto.sumarCantidad();
                arrayCarrito.push(producto);
            }
            localStorage.setItem("carrito2", JSON.stringify(arrayCarrito));
            ImgCarrito();
        });
    }
}

export const levantarCarrito = () => {
  let iCarro = JSON.parse(localStorage.getItem("carrito2")) || [];
  console.log(iCarro);
  // for (const oi of iCarro) {
  //               let producto = new Producto(
  //                 resultado.nombre,
  //                 resultado.precio,
  //                 resultado.img,
  //                 resultado.id,
  //                 resultado.categoria,
  //                 resultado.cantidad
  //               );
  //   console.log(producto);
  //   arrayCarrito.push(producto);
  // }
  return arrayCarrito;
};

const ImgCarrito = () => {
  let verTotCarrito = JSON.parse(arrayCarrito.length);
  if (verTotCarrito > 0) {
    console.log("carrito cargado");
    imgcarrito.style.opacity = "1";
  } else {
    imgcarrito.style.opacity = "0.1";
    console.log("carrito vacio");
  }
};



document.addEventListener('DOMContentLoaded',() =>{ getRequest(),ImgCarrito(),levantarCarrito()}
)