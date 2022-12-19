const express = require('express');
const app = express();
const router = express.Router(); // using routing to the server.js
const fs = require('fs');
const path = require('path');
const database = './data/videos.json'

const url  = require('url');

//Reading videos database
function readVideos() {
    const videosFile = fs.readFileSync(database);
    const videosData = JSON.parse(videosFile)
    return videosData;
}

//Writing new videos on database
function writeVideos(data){
    const videosInfo = JSON.stringify(data);
    fs.writeFileSync('./data/videos.json', videosInfo)
}

//get the video ID from URL
function IdFromUrl (req) {
    const videoRequested = url.parse(req.url)
    const videoId = videoRequested.pathname.replace('/','')
    return videoId
}

//find video from database based on ID
function findVideoById (videoRequestedId) {
    const videoData = readVideos();
    const filteredVideo = videoData.filter(video => video.id === videoRequestedId)[0]
    return filteredVideo
}

//********************//
//** ROUTER ACTIONS **//
//********************//


router.get('/', (_req, res) => {
    videoData = readVideos()

    //creates a new array
    let videosList = new Array;

    // loop through the database and creates an smaller videos list
    videoData.forEach(video => {
        const newObj = {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
        }
        videosList.push(newObj)
    });
    
    res.json(videosList);
})

router.get('/:id', (req, res) => {
    const videoId = IdFromUrl (req)
    const filteredVideo = findVideoById(videoId)
    res.send(filteredVideo)
})


router.get('/', (_req, res) => {
    res.status(200).send('Accessed /videos')
})



module.exports = router; // exporting videos