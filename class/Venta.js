class Venta{
    constructor(data) {
        this.id=data.id;
        this.idUsuario=data.idUsuario;
        this.idProducto=data.idProducto;
        this.fecha=data.fecha;
        this.estatus=data.estatus;
    }
    set id(id) {
        this._id=id;
    }
    set idUsuario(idUsuario) {
        this._idUsuario=idUsuario;
    }
    set idProducto(idProducto) {
        this._idProducto=idProducto;
    }
    set fecha(fecha) {
        this._fecha=fecha;
    }
    set estatus(estatus) {
        this._estatus=estatus;
    }
    get id() {
        return this._id;
    }
    get idUsuario() {
        return this._idUsuario;
    }
    get idProducto() {
        return this._idProducto;
    }
    get fecha() {
        return this._fecha;
    }
    get estatus() {
        return this._estatus;
    }
    get datos() {
        if(this._id!=undefined) {
            return {
                id: this.id,
                idUsuario:this.idUsuario,
                idProducto:this.idProducto,
                fecha:this.fecha,
                estatus:this.estatus
            }
        }else{
            return {
                idUsuario:this.idUsuario,
                idProducto:this.idProducto,
                fecha:this.fecha,
                estatus:this.estatus
            }
        }
    }
}

module.exports = Venta;