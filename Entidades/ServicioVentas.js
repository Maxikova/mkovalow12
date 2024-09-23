class ServicioVentas {
    constructor() {
        this._ventas = [];
    }

    getAll() {
        return new Promise(resolve => {
            resolve(this._ventas);
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            let ventas = this._ventas.find(v => v.id == id);
            if (ventas) {
                resolve(ventas);
            } else {
                reject(`Numero de venta no encontrado`);
            }
        });
    }

    getSaleByEmpleado(idEmpleado) {
        return new Promise((resolve, reject) => {
            const EmpleadoVentas = this._ventas.filter(v => v.idEmpleado === idEmpleado);
            if (EmpleadoVentas) {
                resolve(EmpleadoVentas);
            } else {
                reject(`El empleado con ID ${id} no hizo ninguna venta`);
            }
        });
    }    


    addNuevaVenta(vinos,idEmpleado){
        const NewSale = {
            id: this._ventas.length ? this._ventas[this._ventas.length - 1].id + 1 : 1,
            vinos,
            idEmpleado: idEmpleado,
            fecha_venta: new Date().toISOString()
        };

        return new Promise((resolve) => {
            if (NewSale) {
                this._ventas.push(NewSale);
                resolve(this._ventas);
            } 
        });

    }


    deleteById(id) {
        return new Promise((resolve, reject) => {
            const index = this._ventas.findIndex(v => v.id === id);
            if (index != -1) {
                resolve(this._ventas.splice(index, 1));
            }
            else {
                reject(`No existe la venta con ${id}`);
            }
        });
    }
};

module.exports = new ServicioVentas();