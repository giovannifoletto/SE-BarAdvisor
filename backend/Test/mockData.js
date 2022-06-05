const casual = require('casual')

const VAL_TEST = 5

const users = []
const gestoreLocale = []

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

/* 
    evento {
        
    }
*/

casual.define('evento', () => {
    return {
        nome: casual.company_name ,
        descrizione: casual.description,
        dataInizio: new Date("2022-10-08").toUTCString()
    }
})

const generateUsers = () => {
    for (let i=0; i<VAL_TEST; ++i){
        const i = casual.user
        users.push(i)
    }
}

const generateGestoreLocale = () => {
    for (let i=0; i<VAL_TEST; ++i){
        const i = casual.gestoreLocale
        gestoreLocale.push(i)
    }
}

const main = () => {
    generateUsers()
    generateGestoreLocale()
}

const userString = (user) => {
    return `{"nome":"${user.nome}","email":"${user.email}","password":"${user.password}"}`
}

const gestoreLocaleString = (user) => {
    return `{"nome":"${user.nome}","email":"${user.email}","password":"${user.password}","nomeLocale":"${user.nomeLocale}","posizione":"${user.posizione}"}`
}

module.exports= {
    users,
    userString,
    gestoreLocale,
    gestoreLocaleString,
    VAL_TEST,
    casual,
    main
}