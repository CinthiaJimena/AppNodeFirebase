const {ventaDB, usuariosDB} = require("./Conexion");
const Venta = require("../class/Venta");
var {fechaHora} = require("../middlewares/fecha");

function validar(venta){
    var validar = false;
    if(venta.idUsuario!=undefined&&venta.idProducto!=undefined) {
        validar = true;
    }
    return validar;
}

async function mostrarVentas() {
    const ventas = await ventaDB.get();
    ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({id:venta.id, ...venta.data()});
        if(validar(venta1.datos)) {
            ventasValidas.push(venta1.datos);
        }
    });
    return ventasValidas;
}

async function buscarPorId(id) {
    var ventaValida;
    const venta = await ventaDB.doc(id).get();
    const venta1 = new Venta({id:venta.id, ...venta.data()});
    if(validar(venta1.datos)) {
        ventaValida = venta1.datos;
    }
    return ventaValida;
}

async function nuevaVenta(data) {
    data.fecha = fechaHora().fecha+", "+fechaHora().hora+" UTC-6";
    data.estatus="Activo";
    const venta1 = await new Venta(data);
    var ventaValida={};
    var ventaGuardada=false;
    if(validar(venta1.datos)) {
        ventaValida= venta1.datos;
        await ventaDB.doc().set(ventaValida);
        ventaGuardada= true;
    }
    return ventaGuardada;
}

async function borrarVenta(id) {
    var ventaBorrada=false;
    if(await buscarPorId(id)!=undefined) {
        ventaDB.doc(id).update({estatus:"Cancelado"});
        ventaBorrada = true;
    }
    return ventaBorrada;
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    borrarVenta
}