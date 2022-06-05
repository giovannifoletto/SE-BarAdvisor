const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const { set } = require('mongoose');

const stream = fs.createWriteStream("documentations.json");

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BarAdvisor',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*'],
  components: {
      
  }
};

const openapiSpecification = swaggerJsdoc(options);

stream.once('open', (fd)=> {
    stream.write(JSON.stringify(openapiSpecification))
})