const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const bcrypt = require("bcrypt");
const middleware = require("./middleware");
const transaction = require("../db/transaction");

router.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();

//console.log("bodyParser", bodyParser);

router.get("/:email", (req, res) => {
  transaction
    .getPool()
    .connect()
    .then(client => {
      client
        .query(queries.begin)
        .then(() => {
          const sql = queries.getUserDetail;
          let params = [req.params.email];
          return client.query(sql, params);
        })
        .then(results => {
          res.status(200).json(results);
          transaction.commit(client);
        })
        .catch(err => {
          console.log("error", err);
          transaction.rollback(client);
        })
        .then(() => {
          client.query(queries.end);
          client.release();
        });
    });
});

router.post("/", (req, res, next) => {
  //console.log(req.body);
  //console.log(req.files.image);

  //const client = new Client();

  //if (middleware.validUser(req.body)) {
  if (req.headers.cookie) {
    // UPDATE user
    transaction
      .getPool()
      .connect()
      .then(client => {
        client
          .query(queries.begin)
          .then(() => {
            const sql = queries.updateUserDetail;
            let params = [
              req.body.email,
              req.body.name,
              req.body.surname,
              req.body.country,
              req.body.city,
              req.body.phone,
              req.files.image
            ];
            return client.query(sql, params);
            /*bcrypt
              .hash(req.body.password, 10)
              .then(hash => {
                const sql = queries.updateUserDetail;
                let params = [
                  req.body.email,
                  //hash,
                  req.body.name,
                  req.body.surname,
                  req.body.country,
                  req.body.city,
                  req.body.phone,
                  req.files.image
                ];
                return client.query(sql, params);
              })
              .then(results => {
                console.log(results);
                res.status(200).json(results);

                transaction.commit(client);
              })
              .catch(err => {
                console.log("error", err);

                transaction.rollback(client);
              })
              .then(() => {
                client.release();
              });*/
          })
          .then(results => {
            console.log(results);
            res.status(200).json(results);

            transaction.commit(client);
          })
          .catch(err => {
            console.log("error", err);

            transaction.rollback(client);
          })
          .then(() => {
            client.release();
          });
      });
  } else {
    if (middleware.validUser(req.body)) {
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
                      new Date(req.body.birth_date),
                      req.body.country,
                      req.body.city,
                      req.body.phone,
                      req.files.image
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
    } else {
      next(new Error("Invalid user!"));
    }
  }
  /*} else {
    next(new Error("Invalid user!"));
  }*/
});

module.exports = router;
