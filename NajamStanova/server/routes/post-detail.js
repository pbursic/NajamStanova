const express = require('express');
const { Client } = require('pg');
const router = express.Router();

// GET POST
router.get('/:id', (req, res) => {
  const client = new Client();
  client.connect().then(posts => {
    const sql = 'SELECT * FROM posts, users WHERE posts.id=$1;';
    let params = [req.params.id]; //[1];
    console.log("POST-DETAIL: " + params);
    return client.query(sql, params);
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
