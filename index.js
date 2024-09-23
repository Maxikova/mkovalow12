const express = require('express');
const servicioVinos = require('./Entidades/ServicioVinos');
const ServicioClientes = require('./Entidades/ServicioClientes');
const ServicioEmpleados = require('./Entidades/ServicioEmpleados');
const ServicioVentas = require('./Entidades/ServicioVentas');
const bodyParser = require('body-parser');
const moment     = require('moment');
const wrap = require('co-express');
const ServicioVentas = require('./Entidades/ServicioVentas');
const app = express();

app.use(express.json());

//Endpoint generico, el primero

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

///Endpoints para el manejo de los vinos

// Obtener todos los vinos
app.get('/v1/vinos', async (req, res) => {
    let vinos = await servicioVinos.getAll();
    res.json(vinos);
});

// Buscar vinos por criterios
app.get('/v1/vinos/buscar', async (req, res) => {
    try {
        let vinos = await servicioVinos.buscarVinos(req.query);
        res.json(vinos);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});

// Obtener vino por ID
app.get('/v1/vinos/:id', async (req, res) => {
    try {
        let vinos = await servicioVinos.getById(req.params.id); 
        res.json(vinos);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});


app.post('/v1/vinos', async (req, res) => {
    const {marca, bodega, año, precio} = req.query;
    if (!marca || !bodega || !año || !precio)
    {
        return res.status(400).send('Faltan datos del vino');
    }
    let nuevoVino = await servicioVinos.add(req.query); 
    res.status(201).send("Vino creado correctamente");
});

// Actualizar un vino
app.put('/v1/vinos/:id', async (req, res) => {
    const idVino = req.params.id;
    let VinoActualizar = await servicioVinos.getById(idVino);
    const{marca,bodega,año,precio} = req.body; // Es el body
    if(marca) VinoActualizar.marca = marca;
    if(bodega) VinoActualizar.bodega = bodega;
    if(año) VinoActualizar.año = año;
    if(precio) VinoActualizar.precio = precio;
    let Vino_Actualizado = await servicioVinos.update(VinoActualizar);
    res.status(201).send('Vino actualizado correctamente');
});

// Eliminar un vino por ID
app.delete('/v1/vinos/:id', async (req, res) => {
    try {
        let vinos = await service.deleteById(req.params.id);
        res.json(vinos);
    } catch (error) {
        res.status(404).send('Vino no encontrado');
    }
});


///Endpoints para el manejo de los clientes

// Obtener todos los clientes
app.get('/v1/clientes', async (req, res) => {
    let clientes = await ServicioClientes.getAll();
    res.json(clientes);
});

// Obtener clientes por ID
app.get('/v1/clientes/:id', async (req, res) => {
    try {
        let clientes = await ServicioClientes.getById(req.params.id); 
        res.json(clientes);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});


app.post('/v1/clientes', async (req, res) => {
    const {nombre, sexo} = req.query;
    if (!nombre || !sexo )
    {
        return res.status(400).send('Faltan datos del cliente');
    }
    let nuevoCliente = await ServicioClientes.add(req.query); 
    res.status(201).send("Cliente creado correctamente");
});

// Actualizar datos de un cliente
app.put('/v1/clientes/:id', async (req, res) => {
    const idCliente = req.params.id;
    let clienteActualizar = await ServicioClientes.getById(idCliente);
    const{nombre,sexo} = req.body; // Es el body
    if(nombre) clienteActualizar.nombre = nombre;
    if(sexo) clienteActualizar.sexo = sexo;
    let Cliente_Actualizado = await servicioVinos.update(clienteActualizar);
    res.status(201).send('Vino actualizado correctamente');
});

// Eliminar un cliente por ID
app.delete('/v1/clientes/:id', async (req, res) => {
    try {
        let clientes = await service.deleteById(req.params.id);
        res.json(clientes);
    } catch (error) {
        res.status(404).send('Cliente no encontrado');
    }
    // ServicioClientes.deleteById(req.params.id);
    // res.status(204).end();
});


//Endpoints empleados

// Obtener todos los empleados
app.get('/v1/empleados', async (req, res) => {
    let empleados = await ServicioEmpleados.getAll();
    res.json(empleados);
});

// Obtener clientes por ID
app.get('/v1/empleados/:id', async (req, res) => {
    try {
        let empleados = await ServicioEmpleados.getById(req.params.id); 
        res.json(empleados);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});

// Eliminar un empleado por su ID
app.delete('/v1/empleados/:id', async (req, res) => {
    try {
        let empleados = await service.deleteById(req.params.id);
        res.json(empleados);
    } catch (error) {
        res.status(404).send('Empleado no encontrado');
    }
    // ServicioClientes.deleteById(req.params.id);
    // res.status(204).end();
});



// Obtener todas las ventas
app.get('/v1/ventas', async (req, res) => {
    let ventas = await ServicioVentas.getAll();
    res.json(ventas);
});


app.get('/v1/ventas/:id' , async(req,res) =>){
    try{
        let ventas = await ServicioVentas.getById(req.params.id);
        res.json(ventas);
    }

    catch(err){
        console.log(err);
        res.status(404).end();
    }

}


app.post('/v1/ventas', async (req, res) => {
    const {idVino, idEmpleado} = req.query;
    let ventas;
    if (!idVino || !idEmpleado )
    {
        return res.status(400).send('Faltan datos para completar la venta');
    }

    try{
        vino = await ServicioVentas.getById(idVino);
        empleado = await ServicioVentas.getById(idEmpleado);
    }

    let ven = await ServicioClientes.add(req.query); 
    res.status(201).send("Venta creada correctamente");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});