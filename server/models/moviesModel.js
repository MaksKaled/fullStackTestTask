const db = require('../db')

async function fetchMoviesFromDB(limit,offset){
    
    let query = 'select * from movies order by id offset $1';
    const params = [offset];

    if(limit !== 'all'){
        query += ' limit $2';
        params.push(limit)
    }
     const movies = await db.any(query,params);
     const totalCount = await db.one('select count(*) from movies');

     return{
        data:movies,
        total:parseInt(totalCount.count)
     }
}

async function fetchMovieByID(id){
    return await db.one('select * from movies where id = $1',
        [id]);
}

async function addMovie(title, releaseDate, budget, durationMinutes, directorId){
    return await db.none('INSERT INTO movies(title, release_date, budget, duration_minutes, director_id) VALUES($1, $2, $3, $4, $5)',
        [title, releaseDate, budget, durationMinutes, directorId]);
}

async function deleteMovie(id){
    return await db.none('delete from movies where id = $1',id)
}

async function updateMovie(title, releaseDate, budget, durationMinutes, directorId,id){
    return await db.none(
        'update movies set title = $1, release_date = $2, budget = $3, duration_minutes = $4, director_id = $5 where id = $6',
        [title,releaseDate,budget,durationMinutes,directorId,id]
    )
}

async function patchMovie(id,updates){
    const fields = [];
    const values = [];

    for(const[key,value] of Object.entries(updates)){
        fields.push(`${key} = $${fields.length + 1}`);
        values.push(value)
    }

    const query = `update movies set ${fields.join(', ')} where id = $${fields.length + 1}`;
    values.push(id)

    return await db.none(query,values)
}

module.exports = {
    fetchMoviesFromDB,
    addMovie,
    deleteMovie,
    updateMovie,
    patchMovie,
    fetchMovieByID
}