const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const bcrypt = require("bcrypt");

router.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

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
        const sql = queries.getLoginUser;
        let params = [req.body.email];
        return client.query(sql, params);
      })
      .then(user => {
        if (user.rowCount === 0) {
          //console.log("User does not exist!");
          next(new Error("Invalid login!"));
        } else {
          // compare password with hash password
          bcrypt
            .compare(req.body.password, user.rows[0].password)
            .then(result => {
              // if passwords match
              if (result) {
                // setting the 'set-cookie' header
                res.cookie("user_email", user.rows[0].email, {
                  httpOnly: true //,
                  //secure: true, // WHEN IN PRODUCTION
                  //signed: true
                });
                console.log("Logged in!");
                const update = queries.updateUser;
                let params = [req.body.email];
                return client.query(update, params);
                // PUT update user status to true
              } else {
                next(new Error("Invalid login!"));
              }
            })
            .then(results => {
              console.log(results);
              res.status(200).json(results);
            });
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
