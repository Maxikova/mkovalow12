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

    addVenta(id_cliente, id_vino) {
        return new Promise((resolve, reject) => {
            if (!id_cliente || !id_vino) {
                return reject(new Error('Faltan datos para agregar la venta'));
            }
    
            const nueva_venta = {
                id: this._ventas.length ? this._ventas[this._ventas.length - 1].id + 1 : 1,
                id_cliente,
                id_vino,
                fecha_venta: new Date().toISOString()
            };
    
            this._ventas.push(nueva_venta);

            resolve(nueva_venta); 
        });
    }


    getByCliente(id) {
        return new Promise((resolve, reject) => {
            // Buscar el cliente por id
            const cliente = this._ventas.find(c => c.id === id);
    
            // Verificar si el cliente y las ventas existen
            if (cliente && cliente.ventas && cliente.ventas.length > 0) {
                resolve(cliente.ventas);
            } else {
                reject(new Error('No se encontraron ventas para este cliente'));
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