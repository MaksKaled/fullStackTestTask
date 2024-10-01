const pgp = require('pg-promise')()

const cn = {
    host:'localhost',
    port:5432,
    database:'fullstacktestdb',
    user:'postgres',
    password:'12345'
}

// const db = pgp('postgres://postgres:12345@localhost:5432/fullstacktestdb')
const db = pgp(cn)

module.exports = db;