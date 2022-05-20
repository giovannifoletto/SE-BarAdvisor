const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 4000,
    DB_URL_LOCAL: process.env.DB_URL_LOCAL,
    DB_URL_CLUSTER: process.env.DB_URL_CLUSTER
}