const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const stream = fs.createWriteStream("documentations.json");

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'BarAdvisor',
      version: '1.0.0',
      description: "Applicazione che prmette di recuperare informazioni riguardo a Locali ed Eventi",
      termsOfService: "http://swagger.io/terms",
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html"
      },
    },
  },
  host: "https://se-baradvisor.heroku.com",
  basePath: "/api/v1",
  schemes: "http",
  consume: ["applications/json","multipart/form-data"],
  produces: "applications/json",
  apis: ['./routes/*'],
  components: {
    schemas: {
      "Evento": {
        "title": "Evento",
        "type": "object",
        "properties": {
          "nome": {
            "type": "string"
          },
          "locale": {
            "$ref": "#/definitions/Locale"
          },
          "descrizione": {
            "type": "string"
          },
          "dataInizio": {
            "type": "string"
          }
        },
        "required": [
          "nome",
          "locale",
          "dataInizio"
        ]
      },
      "Locale": {
        "title": "Locale",
        "type": "object",
        "properties": {
          "nome": {
            "type": "string"
          },
          "gestore": {
            "$ref": "#/definitions/Utente"
          },
          "posizione": {
            "type": "string"
          },
          "descrizione": {
            "type": "string"
          },
          "eventi": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Evento"
            }
          }
        },
        "required": [
          "nome",
          "gestore",
          "posizione"
        ]
      },
      "Utente": {
        "title": "Utente",
        "type": "object",
        "properties": {
          "nome": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          },
          "ruolo": {
            "type": "string",
            "description": "può essere 'Cliente', 'Gestore Locale' o 'Admin'"
          },
          "locale": {
            "$ref": "#/definitions/Locale"
          }
        },
        "required": [
          "nome",
          "email",
          "password",
          "ruolo"
        ]
      }
    }
  }
};

const openapiSpecification = swaggerJsdoc(options);

stream.once('open', (fd) => {
  stream.write(JSON.stringify(openapiSpecification))
})