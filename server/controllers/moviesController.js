const movieModel = require('../models/moviesModel');
const { validationResult } = require('express-validator');

async function getMovies(req,res){
    const {limit,offset} = req.query;

    try {
        const movies = await movieModel.fetchMoviesFromDB(limit,offset);
        res.json(movies);
    } catch (error) {
        res.status(500).json({message: 'error in receiving movie',error})
    }
}

async function getMovieById(req,res){
    const {id} = req.params;
    try {
        const movie = await movieModel.fetchMovieByID(id)
        res.json(movie)
    } catch (error) {
        res.status(500).json({message:'Movie not found'})
    }
}

async function addMovie(req,res){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {title,release_date,budget,duration_minutes,director_id} = req.body;
    try {
        await movieModel.addMovie(title,release_date,budget,duration_minutes,director_id);
        res.status(201).json({message:'Movie added successfully!'})
    }catch(error){
        res.status(500).json({message:'error adding movie: ',error})
    }
}

async function deleteMovie(req,res){
    const {id} = req.params;
    
    try {
        await movieModel.deleteMovie(id);
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message:"error attempting to delete movie",error})
    }
}

async function updateMovie(req,res){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {id} = req.params;
    const {title,release_date,budget,duration_minutes,director_id} = req.body;

    if(!title || !release_date || !budget || !duration_minutes || !director_id){
        return res.status(400).json({message:'not all fields were provided'})
    }
    try {
        await movieModel.updateMovie(title,release_date,budget,duration_minutes,director_id,id);
        res.status(200).json({message:'Movie updated successfully!'})
    } catch (error) {
        res.status(500).json({message:'error updating movie',error})
    }
}

async function patchMovie(req,res) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    const {id} = req.params;
    const updates = req.body;

    try {
        const isMovieExists = await movieModel.fetchMoviesFromDB(id);
        if(!isMovieExists){
            return res.status(404).json({message:'movie not found'})
        }
        await movieModel.patchMovie(id,updates);
        res.status(200).json({message:'Movie patched successfully'})
    } catch (error) {
        res.status(500).json({message:'error patching movie',error})
    }
}

module.exports = {getMovies,addMovie,deleteMovie,updateMovie,patchMovie,getMovieById}
