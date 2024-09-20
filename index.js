const express = require('express');
const servicioVinos = require('./Entidades/ServicioVinos');
const ServicioVinos = require('./Entidades/ServicioVinos');
const bodyParser = require('body-parser');
const moment     = require('moment');
const wrap = require('co-express');
const app = express();

app.use(express.json());


const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

app.use((request, response, next) => {

    console.log(request.method, request.path);

    next();

});

// Obtener todos los vinos
app.get('/v1/vinos', async (req, res) => {
    let clients = await servicioVinos.getAll();
    res.json(clients);
});

// Buscar vinos por criterios
app.get('/v1/vinos/buscar', async (req, res) => {
    try {

        let lista_vinos = await servicioVinos.buscarVinos(req.query);

        res.json(lista_vinos);

    } catch(ex) {

        console.log(ex);

        res.status(404).end();
    }
});

// Obtener vino por ID
app.get('/v1/vinos/:id', async (req, res) => {
    try {

        let lista_vinos = await servicioVinos.getById(req.params.id); 

        res.json(lista_vinos);

    } catch(ex) {

        console.log(ex);

        res.status(404).end();

    }
});

// Agregar un nuevo vino
app.post('/v1/vinos', wrap(function*(req, res) {
    const {marca, bodega, año, precio} = req.query;

    if (!marca || !bodega || !año || !precio)
    {
        return res.status(400).send('Faltan datos del vino');
    }

    let nuevoVino = yield servicioVinos.add(req.body); 
    res.status(201).send("Vino creado correctamente");
}));

// Actualizar un vino
app.put('/v1/vinos/:id', async (req, res) => {

    const idVino = req.params.id;
    let VinoActualizar = await ServicioVinos.getById(idVino);

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
    service.deleteById(req.params.id);
    res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
