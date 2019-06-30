const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const queries = require("../db/queries");

router.get("", (req, res) => {
  const user_id = req.cookies["user_id"];
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql = queries.getUserPosts;
      let params = [user_id];
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
