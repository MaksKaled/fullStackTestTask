const db = require('../db')

async function fetchMoviesFromDB(){
     return await db.any('select * from movies');
}

async function addMovie(title, releaseDate, budget, durationMinutes, directorId){
    return await db.none('INSERT INTO movies(title, release_date, budget, duration_minutes, director_id) VALUES($1, $2, $3, $4, $5)',
        [title, releaseDate, budget, durationMinutes, directorId]);
}

module.exports = {
    fetchMoviesFromDB,addMovie
}