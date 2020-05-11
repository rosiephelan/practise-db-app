const express = require('express');

const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');

const server = express();

server.use(express.json());

// home endpoint / lets us know server up and running 
server.get('/', (req, res) => {
    res.json({message: "I am son of Hal"})
});

//teaching server how to use these routes ...
// so when server listen and hear below urls, sends to that given routr file for further instructions
server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);

module.exports = server; 

//this file wanna just be about server