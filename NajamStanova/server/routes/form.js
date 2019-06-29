const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const transaction = require("../db/transaction");
const bcrypt = require("bcrypt");
const middleware = require("./middleware");

router.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res, next) => {
  const user_id = req.cookies["user_id"];

  transaction
    .getPool()
    .connect()
    .then(client => {
      client
        .query(queries.begin)
        .then(() => {
          const sql = queries.insertPost;
          let params = [
            user_id,
            req.body.status,
            req.body.title,
            req.body.description,
            req.body.bills_included,
            req.body.country,
            req.body.city,
            req.body.address,
            req.body.price,
            req.body.squares,
            req.body.type,
            req.body.available_date,
            req.body.walkout_date,
            req.body.furnished,
            req.body.bed,
            req.body.room,
            req.body.pet,
            req.body.parking
          ];

          return client.query(sql, params);
        })
        .then(results => {
          res.status(200).json(results);
          transaction.commit(client);
        })
        .catch(err => {
          console.log("error", err);
          client.query(queries.end);
          transaction.rollback(client);
        })
        .then(() => {
          client.release();
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(401).json(err);
    });
});

module.exports = router;
