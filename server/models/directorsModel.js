const db = require('../db')

async function fetchDirectorsFromDB() {
    return await db.any('select * from directors');
}

module.exports = fetchDirectorsFromDB;