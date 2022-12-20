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
app.use('/images', express.static("public/images"))

//**********************//
//***** START HERE *****//
//**********************//

//importing the /videos route data
const videosRoute = require('./routes/videos')

//when accessing /videos, goto videosRoute
app.use('/videos', videosRoute)

//root access
app.get('/', (_req, res) => {
    res.status(200).send('Accessed root')
})

//Listening for access on PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});