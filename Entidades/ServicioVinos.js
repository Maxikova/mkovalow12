class ServicioVinos {
    constructor() {
        console.log('Vinos');

        this._vinos = [
            { id: 1, nombre: 'Cabernet Sauvignon', año: 2018, bodega: 'Bodega A', precio: 1500 },
            { id: 2, nombre: 'Malbec', año: 2020, bodega: 'Bodega B', precio: 1200 },
            { id: 3, nombre: 'Syrah', año: 2019, bodega: 'Bodega C', precio: 1800 },
            { id: 4, nombre: 'Pinot Noir', año: 2017, bodega: 'Bodega D', precio: 2000 },
            { id: 5, nombre: 'Chardonnay', año: 2021, bodega: 'Bodega E', precio: 2200 }
        ];
    }

    // Obtener todos los vinos
    getAll() {
        return new Promise(resolve => {
            resolve(this._vinos);
        });
    }

    // Busca vinos en base al criterio (nombre, año, bodega, precio)
    filterVinos(consulta_vinos) {
        return new Promise(resolve => {
            const { nombre, año, bodega, precio } = consulta_vinos;

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

    // Como obtener vino por ID
    getById(id) {
        return new Promise((resolve, reject) => {
            let vino = this._vinos.find(v => v.id == id);

            if (vino) {
                resolve(vino);
            } else {
                reject(`Vino con ID ${id} no encontrado`);
            }
        });
    }

    // Se agrega un nuevo vino
    add(vino) {
        return new Promise(resolve => {
            const { nombre, año, bodega, precio } = vino;

            const nuevoVino = {
                id: this._vinos.length ? this._vinos[this._vinos.length - 1].id + 1 : 1,
                nombre,
                año,
                bodega,
                precio
            };

            if (nuevoVino) {
                this._vinos.push(nuevoVino);
                resolve(nuevoVino);

            } 
        });
    }

    // Actualizar vino
    update(vinoActualizado) {
        return new Promise((resolve, reject) => {
            const id = vinoActualizado.id;
            const index = this._vinos.findIndex(v => v.id === id);

            if (index !== -1) {
                this._vinos[index] = { ...this._vinos[index], ...vinoActualizado };
                resolve(this._vinos[index]);
            } else {
                reject(`Vino con ID ${id} no encontrado`);
            }
        });
    }


        deleteById(id) {
            return new Promise((resolve, reject) => {
                const index = this._vinos.findIndex(v => v.id === id); // Busca el vino
        
                if (index !== -1) {
                    this._vinos.splice(index, 1); // Elimina el vino
                    resolve(); 
                } else {
                    reject('Vino no encontrado'); 
                }
            });
        }
}

module.exports = new ServicioVinos();
