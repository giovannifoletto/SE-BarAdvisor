const casual = require('casual')

const VAL_TEST = 5

casual.define('user', () => {
    return {
        nome: casual.username,
        email: casual.email,
        password: casual.password
    }
})

casual.define('gestoreLocale', () => {
    return {
        nome: casual.username,
        email: casual.email,
        password: casual.password,
        nomeLocale: casual.company_name,
        posizione: casual.address
    }
})

casual.define('evento', () => {
    return {
        nome: casual.title,
        descrizione: casual.description,
        dataInizio: casual.date((format = 'YYYY-MM-DD')),
        posti: casual.integer(from = 0, to = 100) 
    }
})
 /**
     * @param nome
     * @param email
     * @param password
     */
const state = {
    users: casual.user,
    gestoreLocale: casual.gestoreLocale,
    evento: casual.evento
}

/**
 * Solo per retrocompatibilità con i test.
 * @deprecated
 */
const users = []
const main = () => {
    for(let i=0; i<VAL_TEST; ++i){
        users.push(casual.user)
    }
}

module.exports= {
    main,
    users,
    VAL_TEST,
    state
}