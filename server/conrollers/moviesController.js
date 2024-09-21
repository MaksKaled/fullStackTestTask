const movieModel = require('../models/moviesModel');

async function getMovies(req,res){
    try {
        const movies = await movieModel.fetchMoviesFromDB();
        res.json(movies);
    } catch (error) {
        res.status(500).json({message: 'ошибка при получении фильмов',error})
    }
}

async function addMovie(req,res){
    const {title,release_date,budget,duration_minutes,director_id} = req.body;
    try {
        await movieModel.addMovie(title,release_date,budget,duration_minutes,director_id);
        res.status(201).json({message:'фильм успешно добавлен!'})
    }catch(error){
        res.status(500).json({message:'ошибка при добавлении фильма: ',error})
    }
        
}

module.exports = {getMovies,addMovie}
