require("dotenv").config();
// need to install this package via npm install dotenv

const server = require('./api/server')

// this refers to the .env file, with a fallback port
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`\n*** Server running on port ${port}`)
});


