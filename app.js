//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-neeraj:toughPassword@blogcluster.djzf5.gcp.mongodb.net/blogDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home", {start: homeStartingContent,posts: posts});
  });
});

app.get("/about", function(req, res){
  Post.find({}, function(err, posts){
    res.render("aboutcontact", {title: "About", content: aboutContent, posts: posts});
  });
});

app.get("/contact", function(req, res){
  Post.find({}, function(err, posts){
    res.render("aboutcontact", {title: "Contact", content: contactContent, posts: posts});
  });
});

app.get("/compose", function(req, res){
  Post.find({}, function(err, posts){
    res.render("compose", {posts: posts});
 });
});

app.get("/posts/:postName", function(req, res){
  let requestedTitle = lodash.lowerCase(req.params.postName);
  Post.find({}, function(err, posts){
    posts.forEach(function(post){
      let storedTitle = lodash.lowerCase(post.title);
      if(storedTitle === requestedTitle){
        res.render("post", {title: post.title, content: post.content, posts: posts});
      };
    });
  });
});

app.post("/compose", function(req, res){

  // Post.find({}, function(err, posts){
  //   posts.forEach(function(post){
  //     if(post.title === req.body.title){
  //       res.redirect("/about");
  //     } else {
  //       const post = new Post({
  //         title: req.body.title,
  //         content: req.body.body
  //       });
  //
  //       post.save();
  //     };
  //   });
  //
  // });

  const post = new Post({
    title: req.body.title,
    content: req.body.body
  });

  post.save();

  // let content = {
  //   newTitle: req.body.title,
  //   newBody: req.body.body
  // };
  // blogs.push(content);
  res.redirect("/");
});

app.post("/search", function(req, res){
  let searchTitle = req.body.search;
  res.redirect("posts/:"+searchTitle);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
};

app.listen(port, function(){
  console.log("Server Running");
});
