//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

let blogs = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {start: homeStartingContent, posts: blogs});
});

app.get("/about", function(req, res){
  res.render("aboutcontact", {title: "About", content: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("aboutcontact", {title: "Contact", content: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:postName", function(req, res){
  let requestedTitle = lodash.lowerCase(req.params.postName);
  blogs.forEach(function(blog){
    let storedTitle = lodash.lowerCase(blog.newTitle);
    if(storedTitle === requestedTitle){
      res.render("post", {title: blog.newTitle, post: blog.newBody});
    }
  });
  // res.redirect("/");
});



app.post("/compose", function(req, res){
  let content = {
    newTitle: req.body.title,
    newBody: req.body.body
  };
  blogs.push(content);
  res.redirect("/");
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
