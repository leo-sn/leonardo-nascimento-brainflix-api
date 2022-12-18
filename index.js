//importing express and initializing it on data
const express = require('express');
const app = express();
//solving CORS:
const cors = require('cors');
app.use(cors())
//unique id:
const uniqid = require('uniqid');
//reading/writting files
const fs = require('fs');
//using .env file:
require('dotenv').config();
const PORT = process.env.PORT || 3030;
//Middleware:
app.use(express.json());

//**********************//
//***** START HERE *****//
//**********************//


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (_req, _res) => console.log())