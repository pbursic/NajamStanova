const express = require("express");
//const { Client } = require("pg");
const path = require("path");
const app = express();

// Getting out POSTS routes
const posts = require("./server/routes/posts");
const postDetail = require("./server/routes/post-detail");
const person = require("./server/routes/person");

//app.use(express.static('src'));
app.use(express.static(path.join(__dirname, "dist/NajamStanova")));

// Using middleware
app.use("/view", posts);
app.use("/view/post-detail", postDetail);
app.use("/registration", person);

// Catch all other routes request and return it to the index
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/NajamStanova/index.html'));
});*/

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening to port ${port}...`));
