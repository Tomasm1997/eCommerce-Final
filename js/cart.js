const $cart = document.querySelector('.cart_root');



const productsCart = () => {
    const products = JSON.parse(localStorage.getItem('carrito2'));
    console.log(products)
    products.forEach(element => {
        let { nombre, precio, id, img } = element
        $cart.innerHTML += `

                        <div class="card">
                            <img src=.${img} alt="">
                            <h3>${nombre}</h3>
                            <span>$${precio}</span>
                        </div>
        `
        total()
    });
}

const finalizaCompra = () => {
    const $button = document.querySelector('.btn')
    $button.addEventListener('click', () => {

        Swal.fire({
            title: 'Estás seguro que querés comprar?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location = '/index.html'

                localStorage.removeItem('carrito2')
            } else if (result.isDenied) {
                Swal.fire('La compra no se realizó')
            }
        })

    })
}


finalizaCompra()


const total = () => {
    const $total = document.querySelector(".total")
    const products = JSON.parse(localStorage.getItem("carrito2"))

    const total = products.reduce((acc, item) => item.precio + acc, 0)

    $total.innerHTML = `<h1>$${total}</h1>`
}

document.addEventListener('DOMContentLoaded', productsCart())