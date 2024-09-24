const directorModel = require('../models/directorsModel');

async function getDirectors(req,res){
    try {
        const result = await directorModel.fetchDirectorsFromDB();
    res.json(result)
    } catch (error) {
        res.status(500).json({message: 'ошибка при получении режиссеров',error})
    }
}

async function getDirectorByID(req,res){
    const {id} = req.params;
    try {
        const director = await directorModel.fetchDirectorByID(id);
        res.json(director)
    } catch (error) {
        res.status(500).json({message:'режиссер не найден..'})
    }
}

async function addDirector(req,res) {
    const {name,birth_date,nationality,experience_years,rating} = req.body;
    try {
        await directorModel.addDirectorToDB(name,birth_date,nationality,experience_years,rating)
        res.status(201).json({message:'режиссер успешно добавлен'})
    } catch (error) {
        res.status(500).json({message:'ошибка при добавлении режиссера..'})
    }
}

async function deleteDirector(req,res){
    const {id} = req.params;
    try {
        await directorModel.deleteDirector(id);
        res.status(204).json({message:'режиссер успешно удален'})
    } catch (error) {
        res.status(500).json({message:'ошибка при попытке удалить режиссера..'})
    }
}

async function updateDirector(req,res){
    const {id} = req.params;
    const {name,birth_date,nationality,experience_years,rating} = req.body; 

    if(!name || !birth_date || !nationality || !experience_years || !rating){
        res.status(400).json({message:'не все поля переданы..'})
    }
    try {
        await directorModel.updateDirector(name,birth_date,nationality,experience_years,rating,id)
            res.status(200).json({message:'данные режиссера успешно обновлены!'})
        }
    catch (error) {
        res.status(500).json({message:'ошибки при обновлении данных режиссера..'})
    }
}

async function patchDirector(req,res){
    const {id} = req.params;
    const updates = req.body;

    try {
        const isDirectorExists = await getDirectorByID(id)
        if(!isDirectorExists){
            return res.status(404).json({message:'режиссер не найден'})
        }
        await directorModel.patchDirector(id,updates)
    } catch (error) {
        res.status(500).json({message:'ошибка при изменении данных режиссера'})
    }
}

module.exports = {getDirectors,getDirectorByID,addDirector,deleteDirector,updateDirector,patchDirector}