export class Producto {
    constructor(nombre, precio, img, id, categoria,cantidad) {
        this.nombre = nombre,
            this.precio = precio,
            this.img = img,
            this.id = id,
            this.categoria = categoria,
            this.cantidad = cantidad || 1
    }
   //metodo sumar cantidad
    sumarCantidad() {
        return this.cantidad++;
    }

restarCantidad(){
        return this.cantidad--;
    }

}