const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();

// Getting out POSTS routes
const posts = require('./server/routes/posts');
const postDetail = require('./server/routes/post-detail');
const person = require('./server/routes/person');

//app.use(express.static('src'));
app.use(express.static(path.join(__dirname, 'dist/NajamStanova')));

// Using middleware
app.use('/view', posts);
app.use('/view/post-detail', postDetail);
app.use('/registration', person);

// Catch all other routes request and return it to the index
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/NajamStanova/index.html'));
});*/

const port = process.env.PORT || 4200;
app.listen(port, () =>
  console.log(`Listening to port ${port}...`));

/*app.get('/api/users', (req, res) => {
  const client = new Client();
  client.connect().then(() => {
    return client.query('SELECT * FROM "users";');
  })
  .then((results) => {
    //res.render('index', results);
    res.send(results);
  })
  .catch((err) => {
    console.log('error', err);
    res.send('BAD');
  });
*/

// GET POST
/*app.get('/view/post-detail/:id', (req, res) => {
  const client = new Client();
  client.connect().then(posts => {
    const sql = 'SELECT * FROM posts where id=$1;';
    const params = [req.params.id];
    return client.query(sql, params);
  })
  .then((results) => {
    //res.send(results);
    console.log(results);
    res.status(200).json(results);
  })
  .catch((err) => {
    console.log('error', err);
  });

});*/
