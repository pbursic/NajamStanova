const database = require("./database");

const config = {
  user: database.PGUSER, // name of the user account
  database: database.PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

module.exports = config;
