class ServicioClientes {
    constructor() {
        console.log('Clientes');

        this._clientes = [
            { id: 1, nombre: 'Maximiliano', Sexo: 'Masculino'},
            { id: 2, nombre: 'Marcela', Sexo: 'Femenino'},
            { id: 3, nombre: 'Bautista', Sexo: 'Masculino'},
            { id: 4, nombre: 'Andrea', Sexo: 'Femenino'},
            { id: 5, nombre: 'Facundo', Sexo: 'Masculino'}
        ];
    }

    // Obtener todos los clientes
    getAll() {
        return new Promise(resolve => {
            resolve(this._clientes);
        });
    }

    // Busca vinos en base al criterio (nombre, bodega, año, precio)
    filterVinos(consulta_vinos) {
        return new Promise(resolve => {
            const { nombre, bodega, año, precio } = consulta_vinos;

            let resultados = this._vinos;

            if (nombre) {
                const nombres = nombre.split(',').map(n => n.trim().toLowerCase());
                resultados = resultados.filter(v => nombres.includes(v.nombre.toLowerCase()));
            }

            if (bodega) {
                const bodegas = bodega.split(',').map(b => b.trim().toLowerCase());
                resultados = resultados.filter(v => bodegas.includes(v.bodega.toLowerCase()));
            }

            if (año) {
                resultados = resultados.filter(v => v.año === parseInt(año));
            } 

            if (precio) {
                resultados = resultados.filter(v => v.precio === parseInt(precio));
            }

            resolve(resultados);
        });
    }


    getByCliente(id_cliente) {
        return new Promise((resolve, reject) => {
            const comprasCliente = this._compras.filter(v => v.id_cliente === id_cliente);
    
            // Verifico si el array tiene elementos y no esta vacio
            if (comprasCliente.length > 0) {
                resolve(comprasCliente);
            } else {
                reject(new Error('No se encontraron compras para este cliente'));
            }
        });
    }
    

    // Como cliente por el id
       getById(id) {
        return new Promise((resolve, reject) => {
            let cliente = this._clientes.find(v => v.id == id);

            if (cliente) {
                resolve(cliente);
            } else {
                reject(`Cliente con ID ${id} no encontrado`);
            }
        });
    }

    // Se agrega un nuevo cliente
    add(cliente) {
        return new Promise(resolve => {
            const { nombre, sexo, } = cliente;

            const nuevoCliente = {
                id: this._clientes.length ? this._clientes[this._clientes.length - 1].id + 1 : 1,
                nombre,
                sexo
            };

            this._clientes.push(nuevoCliente);  // Agrega al array en memoria el cliente

            setTimeout(() => {
                resolve(nuevoCliente);
            }, 100);
        });
    }

    // Actualiza a un cliente segun ID
    update(clienteActualizado) {
        return new Promise((resolve, reject) => {
            const id = clienteActualizado.id;
            const index = this._clientes.findIndex(v => v.id === id);

            if (index !== -1) {
                this._clientes[index] = { ...this._clientes[index], ...clienteActualizado };
                resolve(this._clientes[index]);
            } else {
                reject(`Cliente con ID ${id} no encontrado`);
            }
        });
    }

};

module.exports = new ServicioClientes();
