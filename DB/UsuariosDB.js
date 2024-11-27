const { usuariosDB } = require("./Conexion");
const Usuario = require("../class/Usuario");
const { validarPassword, encriptarPassword } = require("../middlewares/funcionesPassword");

function validarUser(usuario) {
    return usuario.nombre !== undefined && usuario.usuario !== undefined && usuario.password !== undefined;
}

async function mostrarUsuarios() {
    try {
        if (!usuariosDB) throw new Error("usuariosDB no está definido");
        const usuarios = await usuariosDB.get();
        const usuariosValidos = [];

        usuarios.forEach(usuario => {
            const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
            if (validarUser(usuario1.datos)) {
                usuariosValidos.push(usuario1.datos);
            }
        });

        return usuariosValidos;
    } catch (error) {
        console.error("Error en mostrarUsuarios:", error.message);
        throw error;
    }
}

async function buscarPorId(id) {
    try {
        if (!usuariosDB) throw new Error("usuariosDB no está definido");
        const usuario = await usuariosDB.doc(id).get();
        if (!usuario.exists) return null;

        const newUsuario = new Usuario({ id: usuario.id, ...usuario.data() });
        return validarUser(newUsuario.datos) ? newUsuario.datos : null;
    } catch (error) {
        console.error("Error en buscarPorId:", error.message);
        throw error;
    }
}

async function nuevoUsuario(data) {
    try {
        if (!usuariosDB) throw new Error("usuariosDB no está definido");

        const { hash, salt } = encriptarPassword(data.password);
        data.password = hash;
        data.salt = salt;
        data.tipousuario = "usuario";

        const usuario1 = new Usuario(data);

        if (validarUser(usuario1.datos)) {
            await usuariosDB.doc().set(usuario1.datos);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error en nuevoUsuario:", error.message);
        throw error;
    }
}

async function borrarUsuario(id) {
    try {
        if (!usuariosDB) throw new Error("usuariosDB no está definido");

        const usuario = await buscarPorId(id);
        if (usuario) {
            await usuariosDB.doc(id).delete();
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error en borrarUsuario:", error.message);
        throw error;
    }
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
};
