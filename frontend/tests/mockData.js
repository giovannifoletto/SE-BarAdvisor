const casual = require('casual')

casual.define('Cliente', () => {
    return {
        nome: casual.username,
        email: casual.email,
        password: casual.password
    }
})

casual.define('GestoreLocale', () => {
    return {
        nome: casual.username,
        email: casual.email,
        password: casual.password,
        locale: casual.company_name,
        posizione: casual.address
    }
})

mockData = {
    Cliente: [casual.Cliente],
    GestoreLocale: [casual.GestoreLocale]
}

module.exports = {
    mockData
}