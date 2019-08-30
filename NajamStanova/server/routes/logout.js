const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const transaction = require("../db/transaction");

router.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res, next) => {
  res.clearCookie("user_id");
  //const client = new Client();

  transaction.getPool().connect((err, client, done) => {
    if (err) {
      transaction.rollback(client, done);
      console.log("ERR!");
      throw err;
    }

    client
      .query(queries.begin)
      .then(() => {
        const sql = queries.logoutUser;
        let params = [req.body.email];
        return client.query(sql, params);
      })
      .then(results => {
        transaction.commit(client, done);
        console.log(results);
        res.status(200).json(results);
      })
      .catch(err => {
        console.log("error", err);
      });
  });
});

module.exports = router;
