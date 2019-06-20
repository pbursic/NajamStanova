const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const bcrypt = require("bcrypt");
const middleware = require("./middleware");
const transaction = require("../db/transaction");

router.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res, next) => {
  //const client = new Client();

  if (middleware.validUser(req.body)) {
    if (req.headers.cookie) {
      // UPDATE user
      transaction
        .getPool()
        .connect()
        .then(client => {
          client.query(queries.begin).then(() => {
            bcrypt
              .hash(req.body.password, 10)
              .then(hash => {
                const sql = queries.updateUser;
                let params = [
                  req.body.email,
                  hash,
                  req.body.name,
                  req.body.surname,
                  "1990-01-01", // new Date()
                  req.body.country,
                  req.body.city,
                  req.body.phone
                ];
                return client.query(sql, params);
              })
              .then(results => {
                console.log(results);
                res.status(200).json(results);

                transaction.commit(results);
              })
              .catch(err => {
                console.log("error", err);

                transaction.rollback(client);
              })
              .then(() => {
                client.release();
              });
          });
        });
    } else {
      // INSERT user
      transaction
        .getPool()
        .connect()
        .then(client => {
          client
            .query(queries.begin)
            .then(() => {
              // Unique email
              const sql = queries.getEmail;
              let params = [req.body.email];
              return client.query(sql, params);
            })
            .then(results => {
              if (results.rowCount === 0) {
                // hashPassword(plaintext, saltRounds)
                bcrypt
                  .hash(req.body.password, 10)
                  .then(hash => {
                    const sql = queries.postUser;
                    let params = [
                      req.body.email,
                      hash,
                      req.body.name,
                      req.body.surname,
                      "1990-01-01", // new Date()
                      req.body.country,
                      req.body.city,
                      req.body.phone
                    ];

                    return client.query(sql, params);
                  })
                  .then(id => {
                    console.log(id);
                    res.status(200).json(id);

                    transaction.commit(client);
                  })
                  .catch(err => {
                    console.log("error", err);

                    transaction.rollback(client);
                  })
                  .then(() => {
                    client.release();
                  });
              } else {
                next(new Error("Email in use!"));
              }
            })
            .catch(err => {
              console.log("error", err);
            });
        });
    }
  } else {
    next(new Error("Invalid user!"));
  }
});

module.exports = router;
