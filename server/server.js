const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;
const moviesRouter = require('./routes/movies')
const directorsRouter = require('./routes/directors')

app.use(cors())
app.use(express.json());

app.use('/api/movies',moviesRouter)
app.use('/api/directors',directorsRouter)


app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`);
})