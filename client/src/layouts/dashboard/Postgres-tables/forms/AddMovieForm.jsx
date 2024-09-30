import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddMovieForm = ({ open, onClose, onMovieAdded }) => {
    const [newMovie, setNewMovie] = useState({
        title: "",
        release_date: "",
        budget: "",
        duration_minutes: "",
        director_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMovie((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        });

        if (response.ok) {
            const result = await response.json();
            onMovieAdded(result.movie);
            setNewMovie({
                title: "",
                release_date: "",
                budget: "",
                duration_minutes: "",
                director_id: "",
            })
            onClose(); 
        } else {
            alert("Ошибка при добавлении фильма");
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Добавить новый фильм
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <div>
                        <TextField
                            label="Название фильма"
                            type="text"
                            name="title"
                            value={newMovie.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                sx: { mt: 1 }, 
                              }}
                        />
                    </div>
                    <div>
                        <TextField
                            label=""
                            type="date"
                            name="release_date"
                            value={newMovie.release_date}
                            onChange={handleChange}
                            fullWidth
                            required
                            
                            InputProps={{
                                sx: { mt: 1 }, 
                              }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Бюджет"
                            type="number"
                            name="budget"
                            value={newMovie.budget}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                sx: { mt: 1 }, 
                              }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Длительность (минуты)"
                            type="number"
                            name="duration_minutes"
                            value={newMovie.duration_minutes}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                sx: { mt: 1 }, 
                              }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="ID Режиссера"
                            type="number"
                            name="director_id"
                            value={newMovie.director_id}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                sx: { mt: 1 }, 
                              }}
                        />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Добавить фильм
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AddMovieForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onMovieAdded: PropTypes.func.isRequired,
};

export default AddMovieForm;
