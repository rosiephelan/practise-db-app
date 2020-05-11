const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();
// method that comes with express for settung up and exporting routes


//all endpoints are for /api/messages as defined in server.js


//dont need to pass lessons in url params
router.delete('/:id', (req, res) => {
    const {id} = req.params
    //deconstruct the id off the params
     
    Lessons.removeMessage(id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `Message with id ${id} successfully deleted`})
        } else {
            res.status(404).json({ message: "there is no messagewith that id"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to delete message"})
    });
});

module.exports = router;