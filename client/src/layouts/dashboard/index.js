// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DirectorsTable from "./Postgres-tables/DirectorsTable";
import MoviesTable from "./Postgres-tables/MoviesTable";

import { useState,useEffect } from "react";

function Dashboard() {
  const[selectedMovieId,setSelectedMovieId] = useState(null);
  const[movies,setMovies] = useState([]);
  
  const fetchMovies = async () =>{
    const response = await fetch('http://localhost:3000/api/movies/?limit=all')
    const result = await response.json();
    console.log(result.data)
    setMovies(result.data)
  }

  const handleAddMovie = async () => {
    
  }
  const handleEditMovie = async () => {

  }

  const handleDeleteMovie = async () => {
    if(!selectedMovieId) return;
    const confirmed = window.confirm('you sure, wanna delete this movie?');
    if(!confirmed) return;

    const response = await fetch(`http://localhost:3000/api/movies/${selectedMovieId}`,{method:'DELETE'});
    if(response.ok) {
      setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== selectedMovieId))
      setSelectedMovieId(null)
    }else{
      alert('ошибка при удалении фильма')
    }
  }

  useEffect(()=>{
    fetchMovies()
  },[])
    
  return (
    <DashboardLayout>
      <SoftBox display="flex" flexDirection="column" minHeight="93vh">
        <DashboardNavbar />
        <SoftBox flex="1" py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <DirectorsTable />
              </Grid>

              <Grid item xs={12} md={6}>
              <SoftBox mb={2} display="flex" justifyContent="space-between">
                  <Button variant="contained" color="primary" onClick={handleAddMovie}>Добавить фильм</Button>
                  <Button variant="contained" color="secondary" onClick={handleEditMovie}>Изменить фильм</Button>
                  <Button variant="contained" color="error" onClick={handleDeleteMovie} disabled={selectedMovieId === null}>Удалить фильм</Button>
                </SoftBox>
                <MoviesTable movies={movies} setSelectedMovieId={setSelectedMovieId}/>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>

        <SoftBox position="sticky" bottom={0}>
          <Footer />
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
