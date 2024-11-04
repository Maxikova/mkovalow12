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
            const ventasCliente = this._ventas.filter(v => v.id === id_cliente);
            if (ventasCliente) {
                resolve(ventasCliente);
            }
            // else {
              //  reject(ClienteID);
            //}
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

    getClientesFrecuentes() {
        return new Promise((resolve) => {
            const clientesFrecuentes = {};

            //Cuento las ventas por cliente
            this._ventas.forEach(venta => {
                const { id_cliente } = venta;
                if (!clientesFrecuentes[id_cliente]) {
                    clientesFrecuentes[id_cliente] = 0; // Inicializa el contador
                }
                clientesFrecuentes[id_cliente]++; // Incrementa el contador de ventas
            });

            const resultado = Object.keys(clientesFrecuentes)
                .filter(clienteId => clientesFrecuentes[clienteId] > 2)
                .map(clienteId => ({
                    clienteId,
                    totalVentas: clientesFrecuentes[clienteId]
                }));

            resolve(resultado);
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            const index = this._ventas.findIndex(v => v.id === id); // Busca a la venta
    
            if (index !== -1) {
                this._ventas.splice(index, 1); // Se elimina la venta
                resolve(); 
            } else {
                reject('Venta no encontrado');
            }
        });
    }
};

module.exports = new ServicioVentas();