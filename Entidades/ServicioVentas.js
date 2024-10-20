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

                if (nueva_venta) {
                    this._ventas.push(nueva_venta);
                    resolve(this._ventas);
    
                } 
        });
    }


    getByCliente(id_cliente) {
        return new Promise((resolve, reject) => {
            const clientes = this._ventas.find(c => c.id === id_cliente);
            
            // Si encontramos al menos un cliente y este tiene ventas
            if (clientes.length > 0 && clientes[0].ventas && clientes[0].ventas.length > 0) {
                resolve(clientes[0].ventas);
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

    frecuentes(id_cliente){
            // Filtramos las ventas para contar cuántas tiene el cliente específico
            const ventasDelCliente = ventas.filter(venta => venta.id === id_cliente);
            
            // Verificamos si el número de ventas es mayor que 2
            if (ventasDelCliente.length > 2) {
                return `El cliente con ID ${clienteId} tiene más de 2 ventas.`;
    }
}
};

module.exports = new ServicioVentas();