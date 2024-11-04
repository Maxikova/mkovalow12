//Entidades
const servicioVinos = require('./Entidades/ServicioVinos');
const ServicioClientes = require('./Entidades/ServicioClientes');
const ServicioVentas = require('./Entidades/ServicioVentas');

//Librerias
const express = require('express');
const app = express();
const cors = require('cors');

//Variables Swagger
const swaggerInfo = require('./SwaggerInfo');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const ServicioVinos = require('./Entidades/ServicioVinos');
const swaggerDocs = swaggerJSDoc(swaggerInfo);


app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



//Endpoint generico, el primero
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// Obtener todos los vinos
/**
 * @swagger
 * /v1/vinos:
 *   get:
 *     summary: Obtener todos los vinos
 *     tags: [Vinos]
 *     responses:
 *       200:
 *         description: Lista de vinos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   marca:
 *                     type: string
 *                   bodega:
 *                     type: string
 *                   año:
 *                     type: integer
 *                   precio:
 *                     type: number
 */
app.get('/v1/vinos', async (req, res) => {
    let vinos = await servicioVinos.getAll();
    res.json(vinos);
});

// Buscar vinos por criterios
/**
 * @swagger
 * /v1/vinos/flitro:
 *   get:
 *     summary: Buscar los vinos por criterios
 *     tags: [Vinos]
 *     responses:
 *       200:
 *         description: Lista de vinos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   marca:
 *                     type: string
 *                   bodega:
 *                     type: string
 *                   año:
 *                     type: integer
 *                   precio:
 *                     type: number
 */
app.get('/v1/vinos/filtro', async (req, res) => {
    try {
        let vinos = await servicioVinos.filterVinos(req.query);
        res.json(vinos);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});

// Obtener vino por ID
/**
 * @swagger
 * /v1/vinos/{id}:
 *   get:
 *     summary: Obtener vino por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vino
 *     responses:
 *       200:
 *         description: Vino encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 marca:
 *                   type: string
 *                 bodega:
 *                   type: string
 *                 año:
 *                   type: integer
 *                 precio:
 *                   type: number
 *       404:
 *         description: Vino no encontrado
 */
app.get('/v1/vinos/:id', async (req, res) => {
    try {
        let vinos = await servicioVinos.getById(req.params.id); 
        res.json(vinos);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});

/**
 * @swagger
 * /v1/vinos:
 *   post:
 *     summary: Crear un nuevo vino
 *     tags: [Vinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               bodega:
 *                 type: string
 *               año:
 *                 type: integer
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Vino creado correctamente
 *       400:
 *         description: Faltan datos del vino
 */

app.post('/v1/vinos', async (req, res) => {
    const {nombre, año, bodega, precio} = req.body;
    if (!nombre || !año || !bodega || !precio)
    {
        return res.status(400).send('Faltan datos del vino');
    }
    //let nuevoVino = await servicioVinos.add(req.query);
    
    await ServicioVinos.add({nombre,año,bodega,precio});
    res.status(201).send("Vino creado correctamente");
});



// Actualizar un vino
/**
 * @swagger
 * /v1/vinos/{id}:
 *   put:
 *     summary: Actualizar un vino existente por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vino a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               bodega:
 *                 type: string
 *               año:
 *                 type: integer
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Vino actualizado correctamente
 *       404:
 *         description: Vino no encontrado
 */
app.put('/v1/vinos/:id', async (req, res) => {
    const idVino = req.params.id;
    let VinoActualizar = await servicioVinos.getById(idVino);
    const{nombre,bodega,año,precio} = req.body; // Es el body
    if(nombre) VinoActualizar.nombre = nombre;
    if(bodega) VinoActualizar.bodega = bodega;
    if(año) VinoActualizar.año = año;
    if(precio) VinoActualizar.precio = precio;
    let Vino_Actualizado = await servicioVinos.update(VinoActualizar);
    res.status(201).send('Vino actualizado correctamente');
});

/**
 * @swagger
 * /v1/vinos/{id}:
 *   delete:
 *     summary: Eliminar un vino por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vino
 *     responses:
 *       204:
 *         description: Vino eliminado correctamente
 *       404:
 *         description: Vino inexistente
 */
app.delete('/v1/vinos/:id', async(req, res) => {
    const id = parseInt(req.params.id);  
    try {
      await servicioVinos.getById(req.params.id);
      let vinos = await servicioVinos.deleteById(id);
      
      res.status(200).send('Vino eliminado correctamente');
    } catch(error) {
      console.log(error);
      res.status(404).send("Vino inexistente");

    }
});


///Endpoints para el manejo de los clientes

// Obtener todos los clientes
/**
 * @swagger
 * /v1/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   sexo:
 *                     type: string
 */
app.get('/v1/clientes', async (req, res) => {
    let clientes = await ServicioClientes.getAll();
    res.json(clientes);
});

//Obtengo los clientes frecuentes, indicando tambien el número de veces que compraron
/**
 * @swagger
 * /v1/clientes/frecuentes:
 *   get:
 *     summary: Se obtienen los clientes con mas de una venta
 *     tags: [Clientes]
 *     responses:
 *      200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   sexo:
 *                     type: string
 *      404:
 *          description: No hay clientes frecuentes
 */
app.get('/v1/clientes/frecuentes', async (req, res) => {
    try {
        let clientesFrecuentes = await ServicioVentas.getClientesFrecuentes();
        if (clientesFrecuentes.length > 0) {
            res.json(clientesFrecuentes);
        } else {
            res.status(404).json({ message: 'No hay clientes frecuentes.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener clientes por ID
/**
 * @swagger
 * /v1/clientes/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 sexo:
 *                   type: string
 *       404:
 *         description: Cliente no encontrado
 */
app.get('/v1/clientes/:id', async (req, res) => {
    try {
        let clientes = await ServicioClientes.getById(req.params.id); 
        res.json(clientes);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});


/**
 * @swagger
 * /v1/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del cliente
 *       - in: query
 *         name: sexo
 *         schema:
 *           type: string
 *         required: true
 *         description: Sexo del cliente
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *       400:
 *         description: Faltan datos del cliente
 */
app.post('/v1/clientes/', async (req, res) => {
    const { nombre, sexo } = req.body;
    console.log(req.body);

    if (!nombre || !sexo) {
        return res.status(400).send('Faltan datos del cliente');
    }

    await ServicioClientes.add({ nombre, sexo });
    console.log("Prueba");
    console.log(req.body);
    res.status(201).send("Cliente creado correctamente");
});
  

// Actualizar datos de un cliente
/**
 * @swagger
 * /v1/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               sexo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 */

app.put('/v1/clientes/:id', async (req, res) => {
    const idCliente = req.params.id;
    let clienteActualizar = await ServicioClientes.getById(idCliente);
    const{nombre,sexo} = req.body; // Es el body
    if(nombre) clienteActualizar.nombre = nombre;
    if(sexo) clienteActualizar.sexo = sexo;
    let Cliente_Actualizado = await servicioVinos.update(clienteActualizar);
    res.status(201).send('Cliente actualizado correctamente');
});


// Eliminar un cliente por ID
/**
 * @swagger
 * /v1/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente inexistente
 */
app.delete('/v1/clientes/:id', async(req, res) => {
    const id = parseInt(req.params.id);  
    try {
      await ServicioClientes.getById(req.params.id);
      let clientes = await ServicioClientes.deleteById(id);
      
      res.status(200).send('Cliente eliminado correctamente');
    } catch(error) {
      console.log(error);
      res.status(404).send("Cliente inexistente");

    }
});

// Obtener todas las ventas
/**
 * @swagger
 * /v1/ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   clienteId:
 *                     type: integer
 *                   total:
 *                     type: number
 *                     format: float
 */
app.get('/v1/ventas', async (req, res) => {
    let ventas = await ServicioVentas.getAll();
    res.json(ventas);
});

//Obtener venta por ID
/**
 * @swagger
 * /v1/ventas/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Detalles de la venta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: integer
 *                 total:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Venta no encontrada
 */
app.get('/v1/ventas/:id' , async(req,res) =>{
    try{
        let ventas = await ServicioVentas.getById(req.params.id);
        res.json(ventas);
    }
    catch(err){
        console.log(err);
        res.status(404).end();
    }

});

//Agrego Venta
/**
 * @swagger
 * /v1/ventas:
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *                 description: ID del cliente que realiza la compra
 *                 example: 1
 *               id_vino:
 *                 type: integer
 *                 description: ID del vino que se desea vender
 *                 example: 2
 *             required:
 *               - id_cliente
 *               - id_vino
 *     responses:
 *       201:
 *         description: Venta registrada con éxito
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Se registró la venta
 *       400:
 *         description: No están todos los datos para concretar la venta
 *       404:
 *         description: ID de cliente o ID de vino no encontrado
 *       500:
 *         description: Error interno del servidor
 */
app.post('/v1/ventas', async (req, res) => {
    const { id_cliente, id_vino } = req.body;

    console.log(req.body);

    if (!id_vino || !id_cliente) {
        return res.status(400).send('No están todos los datos para concretar la venta');
    }

    try {
        const vino = await servicioVinos.getById(id_vino);
        if (!vino) {
            return res.status(404).send('ID de vino no encontrado');
        }

        const cliente = await ServicioClientes.getById(id_cliente);
        if (!cliente) {
            return res.status(404).send('ID de cliente no encontrado');
        }

        // Aquí agregamos la venta
        await ServicioVentas.addVenta(id_vino, id_cliente);

        res.status(201).send('Se registró la venta');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

//Elimino una venta
/**
 * @swagger
 * /v1/ventas/{id}:
 *   delete:
 *     summary: Eliminar una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Venta
 *     responses:
 *       204:
 *         description: Venta eliminada correctamente
 *       404:
 *         description: Venta inexistente
 */
app.delete('/v1/ventas/:id', async(req, res) => {
    const id = parseInt(req.params.id);  
    try {
      await ServicioVentas.getById(req.params.id);
      let ventas = await ServicioVentas.deleteById(id);
      
      res.status(200).send('Venta eliminada correctamente');
    } catch(error) {
      console.log(error);
      res.status(404).send("Venta inexistente");

    }
});

//Obtengo las ventas especificas de los clientes
/**
 * @swagger
 * /v1/clientes/{id}/ventas:
 *   get:
 *     summary: Obtener todas las ventas de un cliente
 *     description: Devuelve una lista de todas las compras realizadas por un cliente específico.
 *     tags: 
 *       - Ventas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de compras del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_venta:
 *                     type: integer
 *                     description: ID de la venta
 *                     example: 123
 *                   id_vino:
 *                     type: integer
 *                     description: ID del vino comprado
 *                     example: 45
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     description: Fecha de la venta
 *                     example: 2024-10-28
 *       404:
 *         description: Cliente no encontrado o error en la búsqueda de ventas
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error interno del servidor
 */
app.get('/v1/clientes/:id/ventas', async (req, res) => {
    try {
        const id_cliente = parseInt(req.body.id, 10);
        let compras = await ServicioVentas.getByCliente(req.body.id_cliente);
        res.json(compras);
    } catch (error) {
        console.error(error);
        res.status(404).end();
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

