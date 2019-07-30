const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const queries = require("../db/queries");

router.get("/:id", (req, res) => {
  const client = new Client();
  let posts;
  client
    .connect()
    .then(() => {
      const sql = queries.getPostDetails;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(post => {
      posts = post;
      //res.status(200).json(post);
      const sql = queries.getImages;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(images => {
      posts.rows[0].images = images.rows;
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
    })
    .then(() => client.end());
});

//getUserPostDetails
router.get("/:id/post-edit", (req, res) => {
  const client = new Client();
  let posts;
  client
    .connect()
    .then(() => {
      const sql = queries.getUserPostDetails;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(post => {
      posts = post;
      //res.status(200).json(post);
      const sql = queries.getImages;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(images => {
      posts.rows[0].images = images.rows;
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
    })
    .then(() => client.end());
});

module.exports = router;
