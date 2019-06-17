const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const queries = require("../db/queries");
const middleware = require("./middleware");

router.get("/", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      return client.query(queries.getPosts);
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
