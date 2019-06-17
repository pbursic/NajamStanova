const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const transaction = require("../db/transaction");
const bcrypt = require("bcrypt");
const middleware = require("./middleware");

router.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res, next) => {
  if (middleware.validUser(req.body)) {
    transaction
      .getPool()
      .connect()
      .then(client => {
        client
          .query(queries.begin)
          .then(() => {
            const sql = queries.getLoginUser;
            let params = [req.body.email];
            return client.query(sql, params);
          })
          .then(user => {
            if (user.rowCount === 0) {
              next(new Error("Invalid login!"));
            } else {
              bcrypt
                .compare(req.body.password, user.rows[0].password)
                .then(result => {
                  if (result) {
                    res.cookie("user_id", user.rows[0].id, {
                      httpOnly: true,
                      secure: false //true, // WHEN IN PRODUCTION
                      //signed: true
                    });
                    const update = queries.updateUser;
                    let params = [req.body.email];
                    return client.query(update, params);
                  } else {
                    next(new Error("Invalid login!"));
                  }
                })
                .then(results => {
                  console.log(results);
                  res.status(200).json(results);

                  transaction.commit(client);
                });
            }
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
    next(new Error("Invalid user!"));
  }
});

module.exports = router;
