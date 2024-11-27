const rutas = require("express").Router();
const {mostrarVentas, nuevaVenta, buscarPorId, borrarVenta} = require("../DB/VentasBD");

rutas.get("/ventas", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/ventas/buscarPorId/:id", async (req, res) => {
    var ventaValida = await buscarPorId(req.params.id);
    res.json(ventaValida);
});

rutas.post("/ventas/nuevaVenta", async (req, res) => {
    var ventaNueva = await nuevaVenta(req.body);
    res.json(ventaNueva);
});

rutas.delete("/ventas/borrarVenta/:id", async (req, res) => {
    var ventaBorrada = await borrarVenta(req.params.id);
    res.json(ventaBorrada);
});

module.exports = rutas;