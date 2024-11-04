class ServicioClientes {
    constructor() {
        console.log('Clientes');

        this._clientes = [
            { id: 1, nombre: 'Maximiliano', sexo: 'Masculino'},
            { id: 2, nombre: 'Marcela', sexo: 'Femenino'},
            { id: 3, nombre: 'Bautista', sexo: 'Masculino'},
            { id: 4, nombre: 'Andrea', sexo: 'Femenino'},
            { id: 5, nombre: 'Facundo', sexo: 'Masculino'}
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


    // Como cliente por el id
       getById(id) {
        return new Promise((resolve, reject) => {
            let cliente = this._clientes.find(v => v.id == id);

            if (cliente) {
                resolve(cliente);
            } else {
                reject(`Cliente con ID ${id} no encontrados`);
            }
        });
    }

    //Se agrega un nuevo cliente
    add(cliente) {
        return new Promise(resolve => {
            const { nombre, sexo, } = cliente;

            const nuevoCliente = {
                id: this._clientes.length ? this._clientes[this._clientes.length - 1].id + 1 : 1,
                nombre,
                sexo
            };

            if (nuevoCliente) {
                this._clientes.push(nuevoCliente);
                resolve(nuevoCliente);

            } 
        
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

    deleteById(id) {
        return new Promise((resolve, reject) => {
            const index = this._clientes.findIndex(v => v.id === id); // Busca el cliente
    
            if (index !== -1) {
                this._clientes.splice(index, 1); // Se elimina el cliente
                resolve(); 
            } else {
                reject('Cliente no encontrado');
            }
        });
    }

};

module.exports = new ServicioClientes();
