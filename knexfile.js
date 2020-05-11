// Update with your config settings.
// use null defautl if using sqlite3

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lessons.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    }
    
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_url,
    pool: {
      min: 2,
      max: 10, 
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations'
    }
  }
};

// pool enforeces foreign ket relation beetween our tables 
// pool runs after table mounted

// connection = what points to our postgres table - the variable on heroku