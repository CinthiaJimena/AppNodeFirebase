const admin = require("firebase-admin");
const keys = require("../keys.json");
const Producto = require("../class/Producto");

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

const db = admin.firestore();
const usuariosDB = db.collection("Usuario"); // Renombrado
const productosDB = db.collection("Producto"); // Renombrado

module.exports = {
    usuariosDB, // Cambiado de Usuario a usuariosDB
    productosDB // Cambiado de Producto a productosDB
};

// console.log(usuariosDB);
