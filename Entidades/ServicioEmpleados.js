class ServicioEmpleados {
    constructor() {
        console.log('Empleados');

        this._empleados = [
            { id: 11, nombre: 'Oscar', Sexo: 'Masculino'},
            { id: 22, nombre: 'Fatima', Sexo: 'Femenino'},
            { id: 33, nombre: 'Lucas', Sexo: 'Masculino'},
            { id: 44, nombre: 'Yamila', Sexo: 'Femenino'},
            { id: 55, nombre: 'Esteban', Sexo: 'Masculino'}
        ];
    }

    // Obtener todos los empleados
    getAll() {
        return new Promise(resolve => {
            resolve(this._empleados);
        });
    }

    // Obtener empleado por el id
       getById(id) {
        return new Promise((resolve, reject) => {
            let empleados = this._empleados.find(v => v.id == id);

            if (empleados) {
                resolve(empleados);
            } else {
                reject(`Empleado con ID ${id} no encontrado`);
            }
        });
    }

    // Eliminar empleado por ID
    deleteById(id) {

        return new Promise((resolve, reject) => {
            const index = this._empleados.findIndex(v => v.id === id);
            console.log(index);

            if (index !== -1) {
                this._empleados.splice(index, 1);  // Elimina el empleado del arreglo
                resolve();
            } else {
                reject(`Empleado con ID ${id} no encontrado`);
            }
        });
    }
}

module.exports = new ServicioEmpleados();
