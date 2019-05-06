const express = require('express');
const { Client } = require('pg');
const router = express.Router();

// GET ALL POSTS
router.get('/', (req, res) => {
  const client = new Client();
  client.connect().then(posts => {
    return client.query('SELECT * FROM posts WHERE posts.status = true;');
  })
  .then((results) => {
    //res.send(results);
    res.status(200).json(results);
  })
  .catch((err) => {
    console.log('error', err);
  });

});

module.exports = router;
