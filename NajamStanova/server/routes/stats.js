const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");

router.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      return client.query(queries.getAvgPrice);
    })
    .then(results => {
      //res.send(results);
      res.status(200).json(results);
    })
    .catch(err => {
      console.log("error", err);
    })
    .then(() => client.end());
});

module.exports = router;
