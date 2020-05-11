//db helpers gonna interact with db config 

// so herokus know  to run on production and if not development engine
const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = require('./knexfile')[dbEngine];

module.exports = require('knex')(config);