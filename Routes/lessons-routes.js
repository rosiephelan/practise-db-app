const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();
// method that comes with express for settung up and exporting routes


//all endpoints are for /api/lessons as defined in server.js
router.post('/', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message: "cannot add lesson"})
    });
});

router.get('/', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch(error => {
        res.status(500).json({message: "unable to retrieve lessons"})
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Lessons.findById(req.params.id)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson)
        } else {
            res.status(404).json({message: "record not found"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform function"})
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Lessons.remove(id) 
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "successfully deleted"})
            } else {
                res.status(404).json({ message: "unable to locate record"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "unable to delete"})
        });
    
});

router.patch('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    Lessons.update(id, changes)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson)
        } else {
            res.status(404).json({message:'record not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: "error updating record"})
    })
})

//writing an endpoint that adds a value to a child table
router.post('/:id/messages', (req, res) => {
    const {id} = req.params;
    const msg = req.body;
    //^^ the json obj passing in 
    // now need to get id inseted into url into json obj

    if (!msg.lesson_id) {
        msg["lesson_id"] = parseInt(id, 10);
        // this is saying if lessonid not a key in msg object then add it  
    }

    // lets check if this id exists 
    Lessons.findById(id)
    .then(lesson => {
        if(!lesson) {
            res.status(404).json({ message: "Invalid id"})
        }
        //if after passing in this findid no result/there is no lesson 

        // check for all required fields 
        if(!msg.sender || !msg.text) {
            res.status(400).json({ message: "Must provide both sender and text values"})
        }

        //add our message as passed all above passing in the message and the id we got 
        Lessons.addMessage(msg, id)
        .then(message => {
            if (message) {
                res.status(200).json(message);
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to add message"})
        })
    })
    .catch(error => {
        res.status(500).json({ message: "error finding lesson"})
    });
});

// give me everything from messages endpoint, 
// create unique object with info combined from both tables 
// strength of relational databases to mould data as you wish
router.get('/:id/messages', (req, res) => {
    const { id } = req.params

    Lessons.findLessonMessages(id)
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch(error => {
        res.status(500).json({message: "Error retrieving messages"})
    });
});

module.exports = router;
