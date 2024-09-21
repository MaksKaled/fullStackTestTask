const express = require('express');
const app = express();
const PORT = 3000;
const pgp = require('pg-promise')()
app.use(express.json());

const cn = {
    host:'localhost',
    port:5432,
    database:'fullstacktestdb',
    user:'postgres',
    password:'12345'
}

// const db = pgp('postgres://postgres:12345@localhost:5432/fullstacktestdb')
const db = pgp(cn)

app.get('/test', async (req,res)=>{
    try {
        const data = await db.any('select * from directors');
        res.json(data);
    } catch (error) {
        console.error('error: ',error);
        res.status(500).send('internal server error');
    } 
})

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`);
})