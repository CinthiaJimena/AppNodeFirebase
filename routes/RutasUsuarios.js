var rutas = require("express").Router();
var {mostrarUsuarios,borrarUsuario,buscarPorId,nuevoUsuario} = require("../DB/UsuariosDB");
//Aqui solo pedimos la funcion del router sin llamar a todo express
//var {Router} = require("express");

rutas.get("/",async (req,res)=>{
    //res.send("Hoal estas en la raiz");
    var usuariosValidos = await mostrarUsuarios();
    //console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id",async (req,res)=>{
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
    var usuarioGuardado = await nuevoUsuario(req.body);
    res.json(usuarioGuardado);
});

rutas.delete("/borrarUsuario/:id",async (req,res)=>{
    var usuariBorrado = await borrarUsuario(req.params.id);
    res.json(usuariBorrado);
});

module.exports = rutas;