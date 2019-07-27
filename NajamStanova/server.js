const express = require("express");
const path = require("path");
const app = express();
var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const posts = require("./server/routes/posts");
const userPosts = require("./server/routes/user-posts");
const postDetail = require("./server/routes/post-detail");
const person = require("./server/routes/person");
const registration = require("./server/routes/registration");
const login = require("./server/routes/login");
const logout = require("./server/routes/logout");
const form = require("./server/routes/form");
const images = require("./server/routes/images");
const middleware = require("./server/routes/middleware");

//app.use(express.static('src'));
app.use(express.static(path.join(__dirname, "dist/NajamStanova")));

//app.use(express.bodyParser({ limit: "50mb" }));

app.use(cookieParser());
//app.use(cookieParser("keyboard_cat"));
//app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(fileUpload());

/*app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});*/

/*
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!!');
});
*/

// Using middleware
app.use("/api/view", posts);
app.use("/api/view/post-detail", postDetail);
app.use("/api/user-posts", userPosts);
app.use("/api/user-posts/post-detail", middleware.isLoggedIn, postDetail);
//app.use("/user-posts/post-detail", middleware.isLoggedIn, images);
app.use("/api/registration", registration);
app.use("/api/profile", registration);
app.use("/api/", login);
//app.use("/", logout);
app.use("/api/form", middleware.isLoggedIn, form);

app.use(function(error, req, res, next) {
  console.log("USEERRRORRRRRR!!!!!!!!!", error);
  res.status(500).json(error.message);
});

// Catch all other routes request and return it to the index
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/NajamStanova/index.html"));
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening to port ${port}...`));
