const mysql = require('mysql2')

const config = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'eventplanner'
}

const createConnection = mysql.createPool(config)

module.exports = createConnection.promise()