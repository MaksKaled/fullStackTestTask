import React,{useState,useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const EditMovieForm = ({open,onClose,movieId,onMovieUpdated}) => {
    const [movieData,setMovieData] = useState({
        title: "",
        release_date: "",
        budget: "",
        duration_minutes: "",
        director_id: "",
    })

    useEffect(()=>{
        if(movieId){
        fetchMovieData(movieId);
        }
    },[movieId])

    const fetchMovieData = async(id) => {
        const response = await fetch(`http://localhost:3000/api/movies/${id}`)
        const data = await response.json();
    
        const formattedReleaseDate = DateTime.fromISO(data.release_date, { zone: 'utc' }).toLocal().toISODate()

        console.log(formattedReleaseDate)
        setMovieData({
            ...data,
            release_date: formattedReleaseDate 
        })
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const {id, ...updates} = movieData;
        updates.release_date = DateTime.fromISO(movieData.release_date).toLocal().toISODate()
        

   
        const response = await fetch(`http://localhost:3000/api/movies/${movieId}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(updates)
            
        })


        if(response.ok){
            alert('successful!')
            const data = await response.json();
            const updatedMovie = data.movie;
            onMovieUpdated(updatedMovie)
            onClose();
        }else{
            const errorData = await response.json();
            console.error('Error: ',errorData)
            alert('error!!' + errorData.message)
        }
    }
  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>
        Редактировать фильм
        <IconButton
            aria-label="close"
            onClick={onClose}
            style={{ position: 'absolute', right: 8, top: 8 }}
        >
            <CloseIcon />
        </IconButton>
    </DialogTitle>
    <DialogContent>
        <form onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                fullWidth
                label="Название"
                value={movieData.title}
                onChange={(e) => setMovieData(prevData => ({ ...prevData, title: e.target.value }))}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Дата выпуска"
                type="date" 
                value={movieData.release_date}
                onChange={(e) => setMovieData(prevData => ({ ...prevData, release_date: e.target.value }))}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Бюджет"
                type="number"
                value={movieData.budget}
                onChange={(e) => setMovieData(prevData => ({ ...prevData, budget: e.target.value }))}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Длительность (мин)"
                type="number"
                value={movieData.duration_minutes}
                onChange={(e) => setMovieData(prevData => ({ ...prevData, duration_minutes: e.target.value }))}
            />
            <TextField
                margin="normal"
                fullWidth
                label="ID Режиссера"
                value={movieData.director_id}
                onChange={(e) => setMovieData(prevData => ({ ...prevData, director_id: e.target.value }))}
            />
        </form>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose} color="primary">
            Отмена
        </Button>
        <Button type="submit" onClick={handleSubmit} color="primary">
            Сохранить изменения
        </Button>
    </DialogActions>
</Dialog>
  )
}

EditMovieForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    movieId: PropTypes.number.isRequired,
    onMovieUpdated: PropTypes.func.isRequired
};

export default EditMovieForm