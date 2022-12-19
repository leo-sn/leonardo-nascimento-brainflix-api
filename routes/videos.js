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

// router.post('/upload', (req, res) => {


//     const newVideo = new Object;
//     newVideo = {
//         id: "84e96018-4022-434e-80bf-000ce4cd12b8",
//         title: "BMX Rampage: 2021 Highlights",
//         channel: "Red Cow",
//         image: "https://i.imgur.com/l2Xfgpl.jpg",
//         description: "On a gusty day in Southern Utah, a group of 25 daring mountain bikers blew the doors off what is possible on two wheels, unleashing some of the biggest moments the sport has ever seen. While mother nature only allowed for one full run before the conditions made it impossible to ride, that was all that was needed for event veteran Kyle Strait, who won the event for the second time -- eight years after his first Red Cow Rampage title",
//         views: "1,001,023",
//         likes: "110,985",
//         duration: "4:01",
//         video: "",
//         timestamp: new Date().getTime(),
//         comments: []
//     }
// })

router.get('/', (_req, res) => {
    res.status(200).send('Accessed /videos')
})

module.exports = router; // exporting videos