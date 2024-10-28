module.exports = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de mi Vinoteca',
        version: '1.0.0',
        description: 'Documentación de la API para la gestión de vinos, clientes y ventas de la vinoteca',
        contact: {
          name: 'Vinos Finos',
          email: 'info@vinosfinos.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desarrollo'
        }
      ]
    },
    apis: ['./index.js']
  };