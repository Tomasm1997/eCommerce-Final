export class Producto {
    constructor(nombre, precio, img, id, categoria) {
        this.nombre = nombre,
            this.precio = precio,
            this.img = img,
            this.id = id,
            this.categoria = categoria,
            this.cantidad = 1
    }


    //metodo sumar cantidad
    sumarCantidad() {
        return this.cantidad++
        // }
        // restarCantidad() {

        // }
    }
}