const express = require("express");
const path = require("path");
const app = express();

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

// check if user is logged in
function isLoggedIn(req, res, next) {
  console.log(req.headers.cookie);
  if (req.headers.cookie) {
    next();
  } else {
    //res.status(401);
    //next(new Error("Un-Authorized"));
    console.log("REDIRECT!");
    //app.use(express.static(path.join(__dirname, "dist/NajamStanova")));
    res.redirect("/");
  }
}

module.exports = {
  validUser,
  isLoggedIn
};
