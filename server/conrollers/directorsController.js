const fetchDirectorsFromDB = require('../models/directorsModel');

async function getDirectors(req,res){
    try {
        const result = await fetchDirectorsFromDB();
    res.json(result)
    } catch (error) {
        res.status(500).json({message: 'ошибка при получении режиссеров',error})
    }
    
}

module.exports = getDirectors