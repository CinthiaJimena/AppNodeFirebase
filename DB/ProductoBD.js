const {productoBD} = require("./Conexion");
const Producto = require("../class/Producto");

function validar(producto){
    var validar = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        validar = true;
    }
    return validar;
}
async function mostrarProducto(){
    const productos = await productoBD.get();
    productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({id: producto.id, ...producto.data()});
        if(validar(producto1.datos)){
            productosValidos.push(producto1);
        }
    });
    return productosValidos;
}
async function buscarPorId(id) {
    var productoValidado;
    const producto = await productoBD.doc(id).get();
    const producto1 = new Producto({id: producto.id, ...producto.data()});
    if (validar(producto1.datos)) {
        productoValidado = producto1.datos;
    }
    return productoValidado;
}
async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    var productoValidado = {};
    var productSave = false;
    if(validar(producto1.datos)){
        productoValidado = producto1.datos;
        await productoBD.doc().set(productoValidado);
        productSave = true;
    }
    return productSave;
}
async function borrarProducto(id) {
    var productoErrease = true;
    if(await buscarPorId(id) != undefined){
        console.log("Poducto eliminado");
        await productoBD.doc().delete()
    }
    return productoErrease;
}

module.exports ={
    mostrarProducto,
    nuevoProducto,
    borrarProducto,
    buscarPorId
}