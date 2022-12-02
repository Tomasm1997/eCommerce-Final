export const getRequest = async () => {

    let arrayProductos=[]
    let req = await fetch("./productos.json")
    let response = await req.json()
    
console.log(response);
// for (const el of response) {
//   arrayProductos.push(el)
// //   console.log(arrayProductos)
// }
// localStorage.setItem("productsArray",JSON.stringify(arrayProductos));

    return response;
   
}