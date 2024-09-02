const express = require ('express');


//Crea el Express Server
const app = express ();


//Parse body as json
app.use(express.json());


let clientes =[
    {id : '1' , nombre : 'Maxi' , email : 'maxi@gmail.com'},
    {id : '2' , nombre : 'Facundo' , email : 'facu@gmail.com'},
    {id : '3' , nombre : 'Ivan' , email : 'ivanchu@gmail.com'},
    {id : '4' , nombre : 'Marcelo' , email : 'marceloda@gmail.com'},
    {id : '5' , nombre : 'Myriam' , email : 'my@gmail.com'} ,
    {id : '6' , nombre : 'Marcela', email : 'marce13@gmail.com'}


]


let nextId = 6;
 
app.post('/carpetas/clientes' , (req,res) => {
    const { nombre , email } = req.body;
   
    if(nombre && email) {


        const nuevoCliente = {


            id : nextId++,
            nombre,
            email
        };


        clientes.push(nuevoCliente);
        res.status(201).json(nuevoCliente);
    } else {


        res.status(400).send('Datos incorrectos');
    }


} );


//Leemos los clientes
app.get('/carpetas/clientes' , (req,res) => {


    res.json(clientes);
})


// Leer un cliente por ID
app.get('/carpetas/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));


    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});


// Eliminar un cliente por ID (baja)
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);


    if (index !== -1) {
        const clienteEliminado = clientes.splice(index, 1)[0];
        res.json(clienteEliminado);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});


//Pongo a escuchar el servidor
const port = 3000;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));