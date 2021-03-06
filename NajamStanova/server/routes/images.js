const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const queries = require("../db/queries");

router.get("/:id", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql = queries.getImages;
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
    .then(() => client.end());
});

module.exports = router;
