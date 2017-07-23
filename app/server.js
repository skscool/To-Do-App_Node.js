var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

//Index Page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/css/index.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'index.css'));
});

app.get('/js/index.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'index.js'));
});


app.get('/img/logo.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'logo.jpg'));
});

app.get('/img/me.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'me.jpg'));
});

app.get('/img/fb.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'fb.gif'));
});


//Signup Page
app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'signup.html'));
});

app.get('/css/signup.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'signup.css'));
});


app.get('/js/signup.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'signup.js'));
});


//Login Page
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

app.get('/css/login.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'login.css'));
});


app.get('/js/login.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'login.js'));
});


//Task Page
app.get('/task', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'task.html'));
});

app.get('/css/task.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'task.css'));
});

app.get('/js/task.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'task.js'));
});


//Tag Page
app.get('/tag', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'tag.html'));
});

app.get('/css/tag.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'tag.css'));
});

app.get('/js/tag.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'tag.js'));
});


//Search Page
app.get('/search', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'search.html'));
});

app.get('/css/search.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'search.css'));
});

app.get('/js/search.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'search.js'));
});


//Add Page
app.get('/add', function (req, res) {
  res.sendFile(path.join(__dirname, 'html', 'add.html'));
});

app.get('/css/add.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'css', 'add.css'));
});

app.get('/js/add.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'js', 'add.js'));
});







app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
