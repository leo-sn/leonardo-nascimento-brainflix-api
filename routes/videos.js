const express = require('express');
const app = express();
const router = express.Router(); // using routing to the server.js
const fs = require('fs');
const path = require('path');
const database = './data/videos.json'
const bodyParser = require('body-parser');
const url  = require('url');
const uniqid = require('uniqid');

//Reading videos database
function readVideos() {
    const videosFile = fs.readFileSync(database);
    const videosData = JSON.parse(videosFile)
    return videosData;
}

//Writing new videos on database
function writeVideos(data){
    const newVideoInfo = (data);
    const oldVideoData = readVideos()

    const toWrite = [...oldVideoData, newVideoInfo]
    fs.writeFileSync('./data/videos.json', JSON.stringify(toWrite))
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

app.use(express.json());
app.use('/images', express.static("public/images"))


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


router.post('/upload', (req, res) => {

    const { link, title, description, image} = req.body

    const dataStripped = {
        link: link,
        title: title,
        description: description,
        image: image,
    }
    
    const newVideo = {
        id: uniqid(),
        title: dataStripped.title,
        channel: "My Channel",
        image: dataStripped.image,
        description: dataStripped.description,
        views: "666,666",
        likes: "666,666",
        duration: "6:66",
        video: "",
        timestamp: new Date().getTime(),
        comments: [],
    }

    writeVideos(newVideo)

    res.status(201).send('Video added successfully.')
})

router.get('/', (_req, res) => {
    res.status(200).send('Accessed /videos')
})

module.exports = router; // exporting videos