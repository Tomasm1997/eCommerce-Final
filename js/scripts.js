import { Producto } from "./ClassProduct.js";
const $root = document.getElementById('root')

let arrayCarrito = []
let arrayProductos = [];

// funciones
export const getRequest = async () => {
    let req = await fetch("./productos.json")

    let response = await req.json()
    for (const el of response) {
        arrayProductos.push(el)
        console.log(arrayProductos)
    }

    localStorage.setItem("productsArray", JSON.stringify(arrayProductos))

    generarCards()
}


export const generarCards = (array) => {
    console.log(array)
    arrayProductos.forEach(element => {
        let { nombre, precio, id, img } = element
        $root.innerHTML += `

                        <div class="card">
                            <img src=.${img} alt="">
                            <h3>${nombre}</h3>
                            <span>$${precio}</span>
                            <button class="btn-agregar btn btn-primary" data-id=${id}>Agregar al carrito</button>
                        </div>
        `
        eventoAgregarProducto()
    });
}

export const eventoAgregarProducto = () => {
    let btns = document.querySelectorAll(".btn-agregar")

    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            let id = event.target.attributes[1].value;
            console.log(id);

            let existe = arrayCarrito.findIndex(el => el.id == id)

            if (existe != -1) {
                let producto = arrayCarrito[existe]
                producto.sumarCantidad();

            } else {
                let resultado = arrayProductos.find(el => el.id == id)

                let producto = new Producto(resultado.nombre, resultado.precio, resultado.img)
                arrayCarrito.push(producto);

            }
            localStorage.setItem("carrito2", JSON.stringify(arrayCarrito))
        })
    }
}

window.onload = function(){
    const data = JSON.parse(localStorage.getItem("carrito2"))

    if(data){
        arrayCarrito = data
    }
    console.log(arrayCarrito)
}

document.addEventListener('DOMContentLoaded', getRequest())