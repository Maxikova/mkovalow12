class ServicioVentas {
    constructor() {
        this._ventas = [];
        this._clientes = clientes;
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

    getClientesFrecuentes() {
        return new Promise((resolve) => {
            const clientesFrecuentes = {};

            // Contamos las ventas por cliente
            this._ventas.forEach(venta => {
                const { id_cliente } = venta;
                if (!clientesFrecuentes[id_cliente]) {
                    clientesFrecuentes[id_cliente] = 0; // Inicializa el contador
                }
                clientesFrecuentes[id_cliente]++; // Incrementa el contador de ventas
            });

            // Filtramos los clientes que tienen más de 2 ventas
            const resultado = Object.keys(clientesFrecuentes)
                .filter(clienteId => clientesFrecuentes[clienteId] > 2)
                .map(clienteId => ({
                    clienteId,
                    totalVentas: clientesFrecuentes[clienteId]
                }));

            resolve(resultado);
        });
    }


    getClientesInactivos() {
        return new Promise((resolve) => {
            const clientesConVentas = new Set(this._ventas.map(venta => venta.id_cliente));
            const clientesInactivos = this._clientes.filter(cliente => !clientesConVentas.has(cliente.id));
            resolve(clientesInactivos);
        });
    }
};

module.exports = new ServicioVentas();