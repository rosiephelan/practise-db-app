// where we write our knex queries 
// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development);

//this replaces const's above
const db = require('../dbConfig');

// the config is needed in order to interact with the database as provides a object linking to it 
// db is that object we need eg here development 

// every query we write we need to export 
module.exports = {
    add,
    find,
    findById,
    remove, 
    update,
    addMessage,
    findLessonMessages,
    removeMessage
};

//queries - add, find, findbyID, remove, update

async function add(lesson) {
    const [id] = await db('lessons').insert(lesson);
    return findById(id);
}

function find() {
    // db object in helper is pointing to our entire database
    // which has two tables, so below we're specifiying lessons 
    return db('lessons');
}

function findById(id) {
    return db('lessons')
    .where ({ id:id })
    .first();
    // chaining on queries defining further what you want eg here where 
    // id field is equal to the id we're passing in in parntheses
}

function remove(id) {
    return db('lessons')
    .where({id:id})
    .del();
}

function update(id, changes) {
    return db('lessons')
        .where({id:id})
        .update(changes)
        .then(() => {
            return findById(id);
        });  
}

function findMessageById(id) {
    return db('messages')
    .where({id})
    .first();
}

// adds are async operation
async function addMessage(message, lesson_id) {
    const [id] = await db('messages')
    .where({lesson_id})
    .insert(message);
    return findMessageById(id);
}
//here have function called addmessage, passing json obj and req.params(id from url)
// gonna do async hit ot the db MESSAGES table
//insert the message
// instantly call and should have id 

// each table both lessons and messages has its own id field
// so say you wanted both lesson_id from lesson and messages in output
// need a join 
function findLessonMessages(lesson_id) {
    return db('lessons as l')
    .join("messages as m", "l.id", "m.lesson_id" )
    // join from knex documents, joining from messages table and what field joining on (the increments field - lessons.id & messages.lesson_id
    .select(
        "l.id as LessonID",
        "l.name as LessonName",
        //giving aliases using as 
        "m.id as MessageID",
        "m.sender",
        "m.text"
    )
    .where({ lesson_id }); // this means where lesson_id equals the lesson_id you're passing in in req.params
}

//passing in id of message (has its own id on top of id that links it to the lessons table)
function removeMessage(id) {
    return db("messages")
    .where({id}) // this could just be {id} as same name
    .del()
} 
