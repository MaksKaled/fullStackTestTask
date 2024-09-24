const db = require('../db')

async function fetchDirectorsFromDB() {
    return await db.any('select * from directors');
}

async function fetchDirectorByID(id){
    return await db.one('select * from directors where id = $1',id)
}

async function addDirectorToDB(name,birth_date,nationality,experience_years,rating){
    return await db.none('INSERT INTO directors(name, birth_date, nationality, experience_years, rating) VALUES($1, $2, $3, $4, $5)',
        [name,birth_date,nationality,experience_years,rating]);
}

async function deleteDirector(id){
    return await db.none('delete from directors where id = $1',id)
}

async function updateDirector(name,birth_date,nationality,experience_years,rating,id){
    return await db.none('update directors set name = $1, birth_date = $2, nationality = $3, experience_years = $4, rating = $5 where id = $6',
        [name,birth_date,nationality,experience_years,rating,id]
    )
}

async function patchDirector(id,updates){
    const fields = [];
    const values = [];

    for(const[key,value] of Object.entries(updates)){
        fields.push(`${key} = $${fields.length + 1}`);
        values.push(value)
    }

    const query = `update directors set ${fields.join(', ')} where id = $${fields.length + 1}`;
    values.push(id)

    return await db.none(query,values)
}

module.exports = {fetchDirectorsFromDB,fetchDirectorByID,addDirectorToDB,deleteDirector,updateDirector,patchDirector};