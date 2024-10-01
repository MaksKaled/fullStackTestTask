const { validationResult } = require('express-validator');
const directorModel = require('../models/directorsModel');

async function getDirectors(req,res){
    const {limit = 10, offset = 0} = req.query; 

    try {
        const result = await directorModel.fetchDirectorsFromDB(limit,offset);
    res.json(result)
    } catch (error) {
        res.status(500).json({message: 'error retrieving directors',error})
    }
}

async function getDirectorByID(req,res){
    const {id} = req.params;
    try {
        const director = await directorModel.fetchDirectorByID(id);
        res.json(director)
    } catch (error) {
        res.status(500).json({message:'director not found..'})
    }
}

async function addDirector(req,res) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,birth_date,nationality,experience_years,rating} = req.body;
    try {
        await directorModel.addDirectorToDB(name,birth_date,nationality,experience_years,rating)
        res.status(201).json({message:'director added successfully'})
    } catch (error) {
        res.status(500).json({message:'error adding director..'})
    }
}

async function deleteDirector(req,res){
    const {id} = req.params;
    try {
        await directorModel.deleteDirector(id);
        res.status(204).json({message:'director deleted successfully'})
    } catch (error) {
        res.status(500).json({message:'error attempting to delete director..'})
    }
}

async function updateDirector(req,res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {id} = req.params;
    const {name,birth_date,nationality,experience_years,rating} = req.body; 
    
    try {
        await directorModel.updateDirector(name,birth_date,nationality,experience_years,rating,id)
            res.status(200).json({message:'director details updated successfully!'})
        }
    catch (error) {
        res.status(500).json({message:'error updating director details..'})
    }
}

async function patchDirector(req,res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {id} = req.params;
    const updates = req.body;
    // console.log(req.body)
    try {
        const isDirectorExists = await directorModel.fetchDirectorByID(id)
        if(!isDirectorExists){
            return res.status(404).json({message:'director not found'})
        }
        await directorModel.patchDirector(id,updates)
        res.status(200).json({message:'director details patched successfully!'})
    } catch (error) {
        res.status(500).json({message:'error patching director details'})
    }
}

module.exports = {getDirectors,getDirectorByID,addDirector,deleteDirector,updateDirector,patchDirector}