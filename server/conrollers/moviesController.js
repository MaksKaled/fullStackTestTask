const movieModel = require('../models/moviesModel');

async function getMovies(req,res){
    try {
        const movies = await movieModel.fetchMoviesFromDB();
        res.json(movies);
    } catch (error) {
        res.status(500).json({message: 'ошибка при получении фильмов',error})
    }
}

async function getMovieById(req,res){
    const {id} = req.params;
    try {
        const movie = await movieModel.fetchMovieByID(id)
        res.json(movie)
    } catch (error) {
        res.status(500).json({message:'Фильм не найден'})
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

async function deleteMovie(req,res){
    const {id} = req.params;
    
    try {
        await movieModel.deleteMovie(id);
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message:"ошибка при попытке удалить фильм",error})
    }
}

async function updateMovie(req,res){
    const {id} = req.params;
    const {title,release_date,budget,duration_minutes,director_id} = req.body;

    if(!title || !release_date || !budget || !duration_minutes || !director_id){
        return res.status(400).json({message:'не все поля переданы'})
    }
    try {
        await movieModel.updateMovie(title,release_date,budget,duration_minutes,director_id,id);
        res.status(200).json({message:'фильм успешно обновлен!'})
    } catch (error) {
        res.status(500).json({message:'ошибка при обновлении фильма',error})
    }
}

async function patchMovie(req,res) {
    const {id} = req.params;
    const updates = req.body;

    try {
        const isMovieExists = await movieModel.fetchMoviesFromDB(id);
        if(!isMovieExists){
            return res.status(404).json({message:'фильм не найден'})
        }
        await movieModel.patchMovie(id,updates);
        res.status(200).json({message:'фильм успешно изменен'})
    } catch (error) {
        res.status(500).json({message:'ошибка при изменении фильма',error})
    }
}

module.exports = {getMovies,addMovie,deleteMovie,updateMovie,patchMovie,getMovieById}
