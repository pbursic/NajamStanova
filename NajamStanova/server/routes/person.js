const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");

router.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

router.get("/:id", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql = queries.getUser;
      let params = [req.params.id];

      return client.query(sql, params);
    })
    .then(results => {
      //res.send(results);
      res.status(200).json(results);
    })
    .catch(err => {
      console.log("error", err);
    })
    .finally(() => client.end());
});

// Users can login to the app with valid email/password
// Users cannot login to the app with a blank or missing email
// Users cannot login to the app with a blank or incorrect password

function validUser(user) {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.email.trim() != "" &&
    user.password.trim().length >= 8;

  return validEmail && validPassword;
}

router.post("/", jsonParser, (req, res, next) => {
  const client = new Client();

  if (validUser(req.body)) {
    client
      .connect()
      .then(() => {
        // Unique email
        const sql = queries.getEmail;
        let params = [req.body.email];
        return client.query(sql, params);
      })
      .then(results => {
        if (results.rowCount === 0) {
          const sql = queries.postUser;
          let params = [
            req.body.email,
            req.body.password,
            req.body.name,
            req.body.surname,
            "1990-01-01",
            req.body.country,
            req.body.city,
            req.body.phone
          ];

          return client.query(sql, params);
        } else {
          next(new Error("Email in use!"));
        }
      })
      .catch(err => {
        console.log("error", err);
      });
  } else {
    next(new Error("Invalid user!"));
  }
});

module.exports = router;
