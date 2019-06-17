const express = require("express");
const path = require("path");
const app = express();
var cookieParser = require("cookie-parser");

const posts = require("./server/routes/posts");
const postDetail = require("./server/routes/post-detail");
const person = require("./server/routes/person");
const registration = require("./server/routes/registration");
const login = require("./server/routes/login");
const logout = require("./server/routes/logout");
const form = require("./server/routes/form");
const middleware = require("./server/routes/middleware");

//app.use(express.static('src'));
app.use(express.static(path.join(__dirname, "dist/NajamStanova")));

app.use(cookieParser());
//app.use(cookieParser("keyboard_cat"));
//app.use(cookieParser(process.env.COOKIE_SECRET));

// Using middleware
app.use("/view", posts);
app.use("/view/post-detail", postDetail);
app.use("/user-posts/post-detail", middleware.isLoggedIn, postDetail);
app.use("/registration", registration);
app.use("/", login);
//app.use("/", logout);
app.use("/form", middleware.isLoggedIn, form);

// Catch all other routes request and return it to the index
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/NajamStanova/index.html'));
});*/

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening to port ${port}...`));
