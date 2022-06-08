const mongoose = require('mongoose')
const config = require('../config')

// funzione per la connessione con il database: 
// può essere DB_URL_LOCAL (database in localhost) oppure DB_URL_CLUSTER (database su cloud Atlas)
exports.connect = async () => {
    try {
        if(config.NODE_ENV === 'testing'){
            await mongoose.connect(config.DB_URL_CLUSTER_TESTING)
        } else {
            await mongoose.connect(config.DB_URL_CLUSTER)
        }
        console.log('connected to db')
    } catch (err) {
        console.error(err.message)
    }
}