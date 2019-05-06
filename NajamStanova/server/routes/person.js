const express = require('express');
const { Client } = require('pg');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

//app.use(express.bodyParser());
router.use(bodyParser.urlencoded({extended: false}));
var jsonParser = bodyParser.json();

// GET POST
router.get('/:id', (req, res) => {
  const client = new Client();
  client.connect().then(posts => {
    const sql = `select distinct users.name, users.surname from posts, users where posts.user_id = $1`;
//'SELECT distinct person.id, person.name, person.surname FROM posts, person where person.id = $1;';

    let params = [req.params.id];
    console.log("PERSON: " + params);
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

router.post('/', jsonParser, (req, res) => {

  const client = new Client();
  client.connect()
    .then(() => {
      const sql = 'INSERT INTO person ("user_id", "name", "surname", "birth_date", "email", "country", "city") VALUES ($1, $2, $3, $4, $5, $6, $7);';
      const params = [1, req.body.name, req.body.surname, '1990-01-01', req.body.email, req.body.country, req.body.city];
      return client.query(sql, params);
    })
    .catch((err) => {
      //console.log('err', err);
      console.log('error', err);
    });
});

module.exports = router;
