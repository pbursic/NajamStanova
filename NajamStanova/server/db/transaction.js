const client = require("pg");
const queries = require("./queries");
const config = require("./config");

const pool = client.Pool(config);

function getPool() {
  return pool;
}

function commit(client) {
  client.query(queries.commit, err => {
    if (err) throw err;
  });
}

function rollback(client) {
  client.query(queries.rollback, err => {
    if (err) throw err;
  });
}

module.exports = {
  getPool,
  commit,
  rollback
};
