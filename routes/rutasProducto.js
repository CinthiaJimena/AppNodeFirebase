var rutas = require("express").Router();
var {mostrarProducto, nuevoProducto, borrarProducto, buscarPorId} = require("../DB/ProductoBD");

rutas.get("/productos",async (req, res)=>{
    var productosValidados = await mostrarProducto();
    res.json(productosValidados);
});

rutas.get("/producto/buscarPorId/:id", async (req, res)=>{
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

rutas.post("/producto/nuevoProducto", async (req, res)=>{
    console.log(req.body);
    var saveProduct = await nuevoProducto(req.body);
    res.json(saveProduct);
});

rutas.get("/producto/borrarProducto/:id", async(req, res)=>{
    var ereaseProduct = await borrarProducto(req.params.id);
    res.json(ereaseProduct);
});

module.exports = rutas;